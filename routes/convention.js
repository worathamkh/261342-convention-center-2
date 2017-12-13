var express = require('express');
var router = express.Router();
var async = require('async');
var randomAnimal = require('adjective-adjective-animal');
var moment = require('moment');
var randomMoment = require('moment-random');
var orm = require('orm');

router.get('/', (req, res) => {
    req.models.convention.find({}, { autoFetch: true }, (err, conventions) => {
        if (err) throw err;
        res.json(conventions);
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
        } else {
            if (overlap) {
                cb(new Error('Time slot not available for selected room'));
            } else {
                Convention.create(data, (err, convention) => {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, convention);
                    }
                });
            }
        }
    });
}

router.post('/new', (req, res) => {
    createConvention(req.models.convention, req.body, (err, convention) => {
        if (err) res.json({ success: false, error: err });//throw err;
        res.json({ success: true, convention: convention });
    });
    // var startTime = moment(req.body.startTime).format('YYYY-MM-DD HH:mm:ss');
    // var endTime = moment(req.body.endTime).format('YYYY-MM-DD HH:mm:ss');
    // var data = {
    //     title: req.body.title,
    //     description: req.body.description,
    //     startTime: startTime,
    //     endTime: endTime,
    //     invitationOnly: req.body.invitationOnly,
    //     room_id: req.body.room_id
    // };
    // req.models.convention.exists({
    //     room_id: req.body.room_id,
    //     startTime: orm.lt(endTime),
    //     endTime: orm.gte(startTime)
    // }, (err, overlap) => {
    //     if (err) throw err;
    //     if (overlap) {
    //         res.json({ success: false, error: 'Time slot not available for selected room' });
    //     } else {
    //         req.models.convention.create(data, (err, convention) => {
    //             if (err) throw err;
    //             res.json({ success: true, convention: convention });
    //         });
    //     }
    // });
});

const patterns = ['The Tales of @', 'The Adventure of @', '@ of The Seven Kingdoms', 'The Sad Story of @', '@ The Great'];
router.post('/gen', (req, res) => {
    randomAnimal('title').then((animal) => {
        req.models.host.find({}, { limit: 10 }, (err, hosts) => {
            if (err) throw err;
            var host = hosts[Math.floor(Math.random() * hosts.length)];
            var host_id = host.login_id;
            // console.log(JSON.stringify(host));
            var pattern = patterns[Math.floor(Math.random() * patterns.length)];
            var start = randomMoment('2018-12-31', moment().format());
            var end = moment(start).add(Math.random() * 4, 'hours');
            var startTime = moment(start).format('YYYY-MM-DD HH:mm:ss');
            var endTime = moment(end).format('YYYY-MM-DD HH:mm:ss');
            var room_id = Math.ceil(Math.random() * 4);
            var data = {
                title: pattern.replace('@', animal),
                description: 'Models and some associations can have one or more properties. Every property has a type and a couple of optional settings you can choose (or leave the default).',
                startTime: moment(start).format('YYYY-MM-DD HH:mm:ss'),
                endTime: moment(end).format('YYYY-MM-DD HH:mm:ss'),
                invitationOnly: false,
                room_id: room_id,
                host_id: host_id
            };
            var hostIsFree = host.isFreeBetween(startTime, endTime);
            // console.log(hostIsFree);
            if (hostIsFree) { // WTF
                // throw new Error('Host is not free');
                res.json({ success: false, error: 'Host is not free' });
            } else {
                createConvention(req.models.convention, data, (err, convention) => {
                    if (err) throw err;
                    req.models.hosting.create({
                        host_login_id: host_id,
                        convention_id: convention.id
                    }, (err, hosting) => {
                        if (err) throw err;
                        res.json({ success: true, convention: convention });
                    });
                });
            }
            // req.models.convention.exists({
            //     room_id: room_id,
            //     startTime: orm.lt(endTime),
            //     endTime: orm.gte(startTime)
            // }, (err, overlap) => {
            //     if (err) throw err;
            //     if (overlap) {
            //         res.json({ success: false, error: 'Time slot not available for selected room' });
            //     } else {
            //         req.models.convention.create(data, (err, convention) => {
            //             if (err) throw err;
            //             res.json({ success: true, convention: convention });
            //         });
            //     }
            // });
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
