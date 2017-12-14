var express = require('express');
var router = express.Router();
var async = require('async');
var randomAnimal = require('adjective-adjective-animal');
var randomParagraph = require('random-paragraph');
var moment = require('moment');
var randomMoment = require('moment-random');
var orm = require('orm');
var R = require('random-js');
var E = R.engines.mt19937().autoSeed();

router.get('/all', (req, res) => {
    req.models.convention.find({}, { autoFetch: true }, (err, conventions) => {
        if (err) throw err;
        res.json(conventions);
    });
});

router.get('/all2', (req, res) => {
    req.models.room.find({}, 'id', (err, rooms) => {
        if (err) throw err;
        async.parallel(rooms.map((room) => {
            return (cb) => {
                req.models.convention.find({ 
                    room_id: room.id 
                }, { 
                    autoFetch: true,
                    autoFetchLimit: 3 
                },
                'startTime',
                (err, conventions) => {
                    cb(err, conventions);
                });
            };
        }), (err, conventionsByRoom) => {
            if (err) throw err;
            res.json(conventionsByRoom);
        });
    });
});

function createConvention(Convention, data, cb) {
    data.startTime = moment(data.startTime).format('YYYY-MM-DD HH:mm:ss');
    data.endTime = moment(data.endTime).format('YYYY-MM-DD HH:mm:ss');
    Convention.exists({
        room_id: data.room_id,
        startTime: orm.lt(data.endTime),
        endTime: orm.gte(data.startTime)
    }, (err, overlap) => {
        if (err) {
            cb(err);
            return;
        }
        if (overlap) {
            cb(new Error('Time slot not available for selected room'));
            return;
        }
        Convention.create(data, (err, convention) => {
            if (err) {
                cb(err);
                return;
            }
            cb(null, convention);
        });
    });
}

router.post('/new', (req, res) => {
    createConvention(req.models.convention, req.body, (err, convention) => {
        if (err) throw err;
        res.json({ success: true, convention: convention });
    });
});

const patterns = ['The Tales of @', 'The Adventure of @', '@ of The Seven Kingdoms', 'The Sad Story of @', '@ The Great'];
router.post('/gen', (req, res) => {
    randomAnimal('title').then((animal) => {
        req.models.host.find({}, {}, (err, hosts) => {
            if (err) throw err;
            var host = hosts[R.integer(0, hosts.length-1)(E)];
            var host_id = host.login_id;
            var start = randomMoment('2018-12-31', moment().format());
            var end = moment(start).add(Math.random() * 4, 'hours');
            var startTime = moment(start).format('YYYY-MM-DD HH:mm:ss');
            var endTime = moment(end).format('YYYY-MM-DD HH:mm:ss');
            var pattern = patterns[R.integer(0, patterns.length-1)(E)];
            var room_id = req.body.room_id || R.integer(1, 4)(E);
            var data = {
                title: pattern.replace('@', animal),
                description: randomParagraph({ min: 4, max: 9 }),
                startTime: moment(start).format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment(end).format('YYYY-MM-DD HH:mm:ss'),
                invitationOnly: false,
                room_id: room_id,
                host_id: host_id,
                // hosting: {
                //     host_login_id: host_id
                // }
            };
            host.isFreeBetween(startTime, endTime, (err, isFree) => {
                if (err) throw err;
                if (!isFree) {
                    res.json({ success: false, error: 'Host is not free' });
                } else {
                    createConvention(req.models.convention, data, (err, convention) => {
                        if (err) throw err;
                        // convention.convention_id = convention.id
                        // convention.save((err) => {
                        //     if (err) throw err;
                        //     res.json({ success: true, convention: convention });
                        // });
                        req.models.hosting.create({
                            host_login_id: host_id,
                            convention_id: convention.id
                        }, (err, hosting) => {
                            if (err) throw err;
                            res.json({ success: true, convention: convention });
                        });
                    });
                }
            });
        });
    });
});

router.get('/clear', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.convention.find({}).remove((err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    }
});

router.get('/resync', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.convention.drop((err) => {
            if (err) throw err;
            req.models.convention.sync((err) => {
                if (err) throw err;
                res.json({ success: true });
            });
        });
    }
});

module.exports = router;
