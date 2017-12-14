require('dotenv').config()

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var orm = require('orm');
var async = require('async');
var moment = require('moment');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(orm.express(process.env.JAWSDB_MARIA_URL, {
	define: function (db, models, next) {
        Login = db.define('login', {
            email: { type: 'text' },
            password: { type: 'text' },
            name: { type: 'text' }
        });
        Admin = Login.extendsTo('admin', {});
        Host = Login.extendsTo('host', {}, {
            methods: {
                isFreeBetween: function (start, end, callback) {
                    var freeStartTime = moment(start);
                    var freeEndTime = moment(end);
                    this.getHostings((err, hostings) => {
                        if (err) {
                            callback(err);
                        } else if (hostings.length === 0) {
                            callback(null, true);
                        } else {
                            async.every(hostings, (hosting, cb) => {
                                hosting.getConvention((err, convention) => {
                                    if (err) {
                                        cb(err);
                                    } else {
                                        var conventionStartTime = moment(convention.startTime);
                                        var conventionEndTime = moment(convention.endTime);
                                        var free = freeEndTime.isBefore(conventionStartTime) 
                                            || conventionEndTime.isBefore(freeStartTime);
                                        cb(null, free);
                                    }
                                });
                            }, (err, free) => {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(null, free);
                                }
                            });
                        }
                    });
                }
            }
        }, {
            reverse: 'login',
            required: true
        });
        Attendee = Login.extendsTo('attendee', {}, {
            methods: {
                isFreeBetween: function (start, end, callback) {
                    var freeStartTime = moment(start);
                    var freeEndTime = moment(end);
                    this.getAttendances((err, attendances) => {
                        if (err) {
                            callback(err);
                        } else if (attendances.length === 0) {
                            callback(null, true);
                        } else {
                            async.every(attendances, (attendance, cb) => {
                                attendance.getConvention((err, convention) => {
                                    if (err) {
                                        cb(err);
                                    } else {
                                        var conventionStartTime = moment(convention.startTime);
                                        var conventionEndTime = moment(convention.endTime);
                                        var free = freeEndTime.isBefore(conventionStartTime) 
                                            || conventionEndTime.isBefore(freeStartTime);
                                        cb(null, free);
                                    }
                                });
                            }, (err, free) => {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(null, free);
                                }
                            });
                        }
                    });
                }
            }
        });
        Hosting = db.define('hosting', {});
        Attendance = db.define('attendance', {});
        Reservation = db.define('reservation', {});
        CreditCard = db.define('credit_card', {
            name: { type: 'text' },
            number: { type: 'text' },
            expr_date: { type: 'date', time: false },
            cvv: { type: 'text' }
        });
        Convention = db.define('convention', {
            title: { type: 'text' },
            description: { type: 'text' },
            startTime: { type: 'date', time: true },
            endTime: { type: 'date', time: true },
            invitationOnly: { type: 'boolean' }
        });
        RoomType = db.define('room_type', {
            name: { type: 'text' },
            description: { type: 'text' }
        });
        Room = db.define('room', {
            name: { type: 'text' },
        });
        Zone = db.define('zone', {
            price: { type: 'integer' }
        }, {
            // methods: {
            //     totalSeats: function (callback) {
            //         this.getSeats((err, seats) => {
            //             callback(err, seats.length);
            //         });
            //     }
            // }
        });
        Seat = db.define('seat', {
            row: { type: 'integer' },
            col: { type: 'integer' }
        }, {
            methods: {
                fullName: function () {
                    return String.fromCharCode(64 + this.row) + this.col;
                },
                isFreeBetween: function (start, end, callback) {
                    var checkStartTime = moment(start);
                    var checkEndTime = moment(end);
                    // console.log('getHostings');
                    this.getAttendances((err, attendances) => {
                        if (err) {
                            callback(err);
                        } else if (attendances.length === 0) {
                            callback(null, true);
                        } else {
                            async.every(attendances, (attendance, cb) => {
                                attendance.getConvention((err, convention) => {
                                    if (err) {
                                        cb(err);
                                    } else {
                                        var conventionStartTime = moment(convention.startTime);
                                        var conventionEndTime = moment(convention.endTime);
                                        var free = checkEndTime.isBefore(conventionStartTime) 
                                            || conventionEndTime.isBefore(checkStartTime);
                                        cb(null, free);
                                    }
                                });
                            }, (err, free) => {
                                if (err) {
                                    callback(err);
                                } else {
                                    callback(null, free);
                                }
                            });
                        }
                    });
                }
            }
        });

        CreditCard.hasOne('owner', Login, { reverse: 'credit_cards' });

        Convention.hasOne('room', Room, { reverse: 'conventions' });

        Room.hasOne('type', RoomType, { reverse: 'rooms' });
        Zone.hasOne('room', Room, { reverse: 'zones' });
        Seat.hasOne('zone', Zone, { reverse: 'seats' });

        Hosting.hasOne('host', Host, { reverse: 'hostings' });
        Hosting.hasOne('convention', Convention, { reverse: 'hostings' });

        Attendance.hasOne('attendee', Attendee, { reverse: 'attendances' });
        Attendance.hasOne('convention', Convention, { reverse: 'attendances' });
        Attendance.hasOne('seat', Seat, { reverse: 'attendances' });

        // this creates a new relation convention_reservedAttendances
        // Convention.hasMany('reservedAttendances', Attendee, {}, { reverse: 'reservations' });
        Reservation.hasOne('convention', Convention, { reverse: 'reservations' });
        Reservation.hasOne('attendee', Attendee, { reverse: 'reservations' });

        models.login = Login;
        models.admin = Admin;
        models.host = Host;
        models.attendee = Attendee;
        models.creditCard = CreditCard;
        models.convention = Convention;
        models.room = Room;
        models.roomType = RoomType;
        models.zone = Zone;
        models.seat = Seat;
        models.hosting = Hosting;
        models.attendance = Attendance;
        models.reservation = Reservation;

        console.log('Done defining models');

        // console.log('Start dropping tables');
        // db.drop(() => {
        //     console.log('Done dropping tables');
            console.log('Start syncing all models');
            db.sync(() => {
                console.log('Done syncing all models');

                next();
            });
        // });
	}
}));

app.use('/', index);
// app.use('/users', users);
app.use('/api/login', require('./routes/login'));
app.use('/api/host', require('./routes/host'));
app.use('/api/attendee', require('./routes/attendee'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/roomtype', require('./routes/roomType'));
app.use('/api/room', require('./routes/room'));
app.use('/api/zone', require('./routes/zone'));
app.use('/api/seat', require('./routes/seat'));
app.use('/api/convention', require('./routes/convention'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
