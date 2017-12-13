var express = require('express');
var router = express.Router();
var async = require('async');

router.get('/', (req, res) => {
    req.models.roomType.find({}, (err, roomTypes) => {
        if (err) throw err;
        res.json(roomTypes);
        // next();
    });
});

router.get('/reset', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.roomType.find({}).remove((err) => {
            if (err) throw err;
            async.parallel([
                (cb) => {
                    req.models.roomType.create({
                        id: 1,
                        name: 'Auditorium',
                        description: 'A room for play'
                    }, cb);
                },
                (cb) => {
                    req.models.roomType.create({
                        id: 2,
                        name: 'Concert Hall',
                        description: 'A room for music'
                    }, cb);
                },
                (cb) => {
                    req.models.roomType.create({
                        id: 3,
                        name: 'Lecture Hall',
                        description: 'A room for lecture'
                    }, cb);
                },
                (cb) => {
                    req.models.roomType.create({
                        id: 4,
                        name: 'Conference Room',
                        description: 'A room for conference'
                    }, cb);
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
        req.models.roomType.find({}).remove((err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    }
});

module.exports = router;
