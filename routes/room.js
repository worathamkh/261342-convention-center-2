var express = require('express');
var router = express.Router();
var async = require('async');

router.get('/', (req, res) => {
    req.models.room.find({}, { autoFetch: true }, (err, rooms) => {
        if (err) throw err;
        res.json(rooms);
    });
});

router.get('/reset', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.room.find({}).remove((err) => {
            if (err) throw err;
            async.parallel([
                (cb) => {
                    req.models.room.create({
                        id: 1,
                        name: 'Auditorium 1',
                    }, (err, room1) => {
                        if (err) { cb(err); return; }
                        req.models.roomType.get(1, (err, roomType1) => {
                            if (err) { cb(err); return; }
                            room1.setType(roomType1, (err) => {
                                if (err) { cb(err); return; }
                                cb(null, room1);
                            });
                        });
                    });
                },
                (cb) => {
                    req.models.room.create({
                        id: 2,
                        name: 'Concert Hall 1',
                    }, (err, room2) => {
                        if (err) { cb(err); return; }
                        req.models.roomType.get(2, (err, roomType2) => {
                            if (err) { cb(err); return; }
                            room2.setType(roomType2, (err) => {
                                if (err) { cb(err); return; }
                                cb(null, room2);
                            });
                        });
                    });
                },
                (cb) => {
                    req.models.room.create({
                        id: 3,
                        name: 'Lecture Hall 1',
                    }, (err, room3) => {
                        if (err) { cb(err); return; }
                        req.models.roomType.get(3, (err, roomType3) => {
                            if (err) { cb(err); return; }
                            room3.setType(roomType3, (err) => {
                                if (err) { cb(err); return; }
                                cb(null, room3);
                            });
                        });
                    });
                },
                (cb) => {
                    req.models.room.create({
                        id: 4,
                        name: 'Conference Room 1',
                    }, (err, room4) => {
                        if (err) { cb(err); return; }
                        req.models.roomType.get(4, (err, roomType4) => {
                            if (err) { cb(err); return; }
                            room4.setType(roomType4, (err) => {
                                if (err) { cb(err); return; }
                                cb(null, room4);
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
        req.models.room.find({}).remove((err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    }
});

module.exports = router;
