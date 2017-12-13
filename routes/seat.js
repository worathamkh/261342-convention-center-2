var express = require('express');
var router = express.Router();
var async = require('async');

router.get('/', (req, res) => {
    req.models.seat.find({}, { autoFetch: true }, (err, seats) => {
        if (err) throw err;
        res.json(seats);
        // next();
    });
});

router.get('/reset', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.seat.find({}).remove((err) => {
            if (err) throw err;
            // async.parallel([
            //     (cb0) => {
            //         req.models.zone.get(1,
            req.models.room.find({ id: [1, 2, 3, 4] }, (err, rooms) => {
                if (err) throw err;
                if (rooms.length != 4) throw new Error('rooms.length != 4');
                var room1 = rooms[0],
                    room2 = rooms[1],
                    room3 = rooms[2],
                    room4 = rooms[3];
                async.parallel([
                    (cb) => {
                        req.models.seat.create({ id: 1, price: 200 }, (err, seat1room1) => {
                            if (err) cb(err);
                            seat1room1.setRoom(room1, (err) => {
                                if (err) cb(err);
                                cb(null, seat1room1);
                            });
                        });
                    },
                    (cb) => {
                        req.models.seat.create({ id: 2, price: 200 }, (err, seat2room1) => {
                            if (err) cb(err);
                            seat2room1.setRoom(room1, (err) => {
                                if (err) cb(err);
                                cb(null, seat2room1);
                            });
                        });
                    },
                    (cb) => {
                        req.models.seat.create({ id: 3, price: 300 }, (err, seat3room1) => {
                            if (err) cb(err);
                            seat3room1.setRoom(room1, (err) => {
                                if (err) cb(err);
                                cb(null, seat3room1);
                            });
                        });
                    },
                    (cb) => {
                        req.models.seat.create({ id: 4, price: 200 }, (err, seat1room2) => {
                            if (err) cb(err);
                            seat1room2.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, seat1room2);
                            });
                        });
                    },
                    (cb) => {
                        req.models.seat.create({ id: 5, price: 200 }, (err, seat2room2) => {
                            if (err) cb(err);
                            seat2room2.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, seat2room2);
                            });
                        });
                    },
                    (cb) => {
                        req.models.seat.create({ id: 6, price: 300 }, (err, seat3room2) => {
                            if (err) cb(err);
                            seat3room2.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, seat3room2);
                            });
                        });
                    },
                    (cb) => {
                        req.models.seat.create({ id: 7, price: 300 }, (err, seat4room2) => {
                            if (err) cb(err);
                            seat4room2.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, seat4room2);
                            });
                        });
                    },
                    (cb) => {
                        req.models.seat.create({ id: 8, price: 400 }, (err, seat5room2) => {
                            if (err) cb(err);
                            seat5room2.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, seat5room2);
                            });
                        });
                    },
                    (cb) => {
                        req.models.seat.create({ id: 9, price: 500 }, (err, seat6room2) => {
                            if (err) cb(err);
                            seat6room2.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, seat6room2);
                            });
                        });
                    },
                    (cb) => {
                        req.models.seat.create({ id: 10, price: 100 }, (err, seat1room3) => {
                            if (err) cb(err);
                            seat1room3.setRoom(room3, (err) => {
                                if (err) cb(err);
                                cb(null, seat1room3);
                            });
                        });
                    },
                    (cb) => {
                        req.models.seat.create({ id: 11, price: 500 }, (err, seat1room4) => {
                            if (err) cb(err);
                            seat1room4.setRoom(room2, (err) => {
                                if (err) cb(err);
                                cb(null, seat1room4);
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
        req.models.seat.find({}).remove((err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    }
});

module.exports = router;
