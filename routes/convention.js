var express = require('express');
var router = express.Router();
var async = require('async');
var randomAnimal = require('adjective-adjective-animal');
var moment = require('moment');
var randomMoment = require('moment-random');

router.get('/', (req, res) => {
    req.models.convention.find({}, { autoFetch: true }, (err, conventions) => {
        if (err) throw err;
        res.json(conventions);
        // next();
    });
});

router.post('/new', (req, res) => {
    // req.models.convention.create({
    //     room_id: req.body.room_id,
    //
    // }
});

const patterns = ['The Tales of @', 'The Adventure of @', '@ of The Seven Kingdoms', 'The Sad Story of @', '@ The Great'];
router.post('/gen', (req, res) => {
    randomAnimal('title').then((animal) => {
        var pattern = patterns[Math.floor(Math.random() * patterns.length)];
        var start = randomMoment('2018-12-31', moment().format());
        var end = moment(start).add(Math.random() * 4, 'hours');
        var data = {
            title: pattern.replace('@', animal),
            description: 'Models and some associations can have one or more properties. Every property has a type and a couple of optional settings you can choose (or leave the default).',
            startTime: moment(start).format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment(end).format('YYYY-MM-DD HH:mm:ss'),
            invitationOnly: false
        };
        req.models.convention.create(data, (err, convention) => {
            if (err) throw err;
            res.json({ success: true, convention: convention });
        });
    });
});

router.get('/reset', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.convention.find({}).remove((err) => {
            if (err) throw err;
            async.parallel([
                (cb) => {
                }
            ], (err, results) => {

            });
            async.parallel([
                (cb) => {
                    req.models.convention.create({
                        id: 1,
                        name: 'Auditorium 1',
                    }, (err, convention1) => {
                        if (err) { cb(err); return; }
                        req.models.conventionType.get(1, (err, conventionType1) => {
                            if (err) { cb(err); return; }
                            convention1.setType(conventionType1, (err) => {
                                if (err) { cb(err); return; }
                                cb(null, convention1);
                            });
                        });
                    });
                },
                (cb) => {
                    req.models.convention.create({
                        id: 2,
                        name: 'Concert Hall 1',
                    }, (err, convention2) => {
                        if (err) { cb(err); return; }
                        req.models.conventionType.get(2, (err, conventionType2) => {
                            if (err) { cb(err); return; }
                            convention2.setType(conventionType2, (err) => {
                                if (err) { cb(err); return; }
                                cb(null, convention2);
                            });
                        });
                    });
                },
                (cb) => {
                    req.models.convention.create({
                        id: 3,
                        name: 'Lecture Hall 1',
                    }, (err, convention3) => {
                        if (err) { cb(err); return; }
                        req.models.conventionType.get(3, (err, conventionType3) => {
                            if (err) { cb(err); return; }
                            convention3.setType(conventionType3, (err) => {
                                if (err) { cb(err); return; }
                                cb(null, convention3);
                            });
                        });
                    });
                },
                (cb) => {
                    req.models.convention.create({
                        id: 4,
                        name: 'Conference Room 1',
                    }, (err, convention4) => {
                        if (err) { cb(err); return; }
                        req.models.conventionType.get(4, (err, conventionType4) => {
                            if (err) { cb(err); return; }
                            convention4.setType(conventionType4, (err) => {
                                if (err) { cb(err); return; }
                                cb(null, convention4);
                            });
                        });
                    });
                }
            ], (err, results) => {
                if (err) throw err;
                res.json({ success: true });
            });
        });
    }
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
