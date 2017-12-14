var express = require('express');
var router = express.Router();
var async = require('async');

router.get('/', (req, res) => {
    req.models.zone.find({}, { autoFetch: true }, (err, zones) => {
        if (err) throw err;
        res.json(zones);
        // next();
    });
});

router.get('/reset', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.zone.find({}).remove((err) => {
            if (err) throw err;
            req.models.room.find({ id: [1, 2, 3, 4] }, (err, rooms) => {
                if (err) throw err;
                if (rooms.length != 4) throw new Error('rooms.length != 4');
                var room1, room2, room3, room4;
                for (var room of rooms) {
                    console.log(JSON.stringify(room));
                    switch (room.id) {
                        case 1: room1 = room; break;
                        case 2: room2 = room; break;
                        case 3: room3 = room; break;
                        case 4: default: room4 = room;
                    }
                }
                async.parallel([
                    (cb) => {
                        req.models.zone.create({ id: 1, price: 200 }, (err, zone1room1) => {
                            if (err) cb(err);
                            zone1room1.setRoom(room1, (err) => {
                                if (err) cb(err);
                                cb(null, zone1room1);
                            });
                        });
                    },
                    (cb) => {
                        req.models.zone.create({ id: 2, price: 200 }, (err, zone2room1) => {
                            if (err) cb(err);
                            zone2room1.setRoom(room1, (err) => {
                                if (err) cb(err);
                                cb(null, zone2room1);
                            });
                        });
                    },
                    (cb) => {
                        req.models.zone.create({ id: 3, price: 300 }, (err, zone3room1) => {
                            if (err) cb(err);
                            zone3room1.setRoom(room1, (err) => {
                                if (err) cb(err);
                                cb(null, zone3room1);
                            });
                        });
                    },
                    (cb) => {
                        req.models.zone.create({ id: 4, price: 200 }, (err, zone1room2) => {
                            if (err) cb(err);
                            zone1room2.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, zone1room2);
                            });
                        });
                    },
                    (cb) => {
                        req.models.zone.create({ id: 5, price: 200 }, (err, zone2room2) => {
                            if (err) cb(err);
                            zone2room2.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, zone2room2);
                            });
                        });
                    },
                    (cb) => {
                        req.models.zone.create({ id: 6, price: 300 }, (err, zone3room2) => {
                            if (err) cb(err);
                            zone3room2.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, zone3room2);
                            });
                        });
                    },
                    (cb) => {
                        req.models.zone.create({ id: 7, price: 300 }, (err, zone4room2) => {
                            if (err) cb(err);
                            zone4room2.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, zone4room2);
                            });
                        });
                    },
                    (cb) => {
                        req.models.zone.create({ id: 8, price: 400 }, (err, zone5room2) => {
                            if (err) cb(err);
                            zone5room2.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, zone5room2);
                            });
                        });
                    },
                    (cb) => {
                        req.models.zone.create({ id: 9, price: 500 }, (err, zone6room2) => {
                            if (err) cb(err);
                            zone6room2.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, zone6room2);
                            });
                        });
                    },
                    (cb) => {
                        req.models.zone.create({ id: 10, price: 100 }, (err, zone1room3) => {
                            if (err) cb(err);
                            zone1room3.setRoom(room3, (err) => {
                                if (err) cb(err);
                                cb(null, zone1room3);
                            });
                        });
                    },
                    (cb) => {
                        req.models.zone.create([
                            { id: 11, price: 50 },
                            { id: 12, price: 50 },
                            { id: 13, price: 50 },
                            { id: 14, price: 50 }
                        ], (err, room4zones) => {
                            if (err) cb(err);
                            else async.each(room4zones, (room4zone, cb2) => {
                                room4zone.setRoom(room4, (err) => {
                                    if (err) cb2(err);
                                    cb2(null, room4zone);
                                });
                            }, (err) => {
                                if (err) cb(err);
                                else cb(null, room4zones);
                            });
                        });
                    }
                ], (err, results) => {
                    if (err) throw err;
                    res.json({ success: true });
                });
            });
        });
    }
});

router.get('/reset4', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.zone.find({ id: [11, 12, 13, 14] }).remove((err) => {
            if (err) throw err;
            req.models.zone.create([
                { id: 11, price: 50, room_id: 4 },
                { id: 12, price: 50, room_id: 4 },
                { id: 13, price: 50, room_id: 4 },
                { id: 14, price: 50, room_id: 4 }
            ], (err, room4zones) => {
                if (err) throw err;
                else res.json(room4zones);
            });
        });
    }
});

router.get('/clear', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.zone.find({}).remove((err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    }
});

module.exports = router;
