require('dotenv').config()

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var orm = require('orm');

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
            email: String,
            password: String,
            name: String
        }, {
            methods: {

            },
            validations: {

            }
        });
        Admin = Login.extendsTo('admin', {});
        Host = Login.extendsTo('host', {}, {
            reverse: 'login',
            required: true
        });
        Attendee = Login.extendsTo('attendee', {});
        Hosting = db.define('hosting', {});
        Attendance = db.define('attendance', {});
        Reservation = db.define('reservation', {});
        CreditCard = db.define('credit_card', {
            name: String,
            number: String,
            expr_date: Date,
            cvv: String
        });
        Convention = db.define('convention', {
            title: { type: 'text' },
            description: { type: 'text' },
            startTime: { type: 'date', time: true },
            endTime: { type: 'date', time: true },
            invitationOnly: { type: 'boolean' }
        });
        RoomType = db.define('room_type', {
            name: String,
            description: String
        });
        Room = db.define('room', {
            name: String,
        });
        Zone = db.define('zone', {
            price: Number
        });
        Seat = db.define('seat', {
            x: Number,
            y: Number
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
app.use('/users', users);
// app.use('/login', require('./routes/login'));
app.use('/api/host', require('./routes/host'));
app.use('/api/roomType', require('./routes/roomType'));
app.use('/api/room', require('./routes/room'));
app.use('/api/zone', require('./routes/zone'));
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
