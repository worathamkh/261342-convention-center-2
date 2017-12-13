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
                var room1 = rooms[0],
                    room2 = rooms[1],
                    room3 = rooms[2],
                    room4 = rooms[3];
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
                        req.models.zone.create({ id: 11, price: 500 }, (err, zone1room4) => {
                            if (err) cb(err);
                            zone1room4.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, zone1room4);
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
