var express = require('express');
var router = express.Router();
var async = require('async');

router.get('/all', (req, res) => {
    req.models.seat.find({}, { autoFetch: true }, (err, seats) => {
        if (err) throw err;
        res.json(seats);
    });
});

router.get('/status/:conventionId', (req, res) => {
    req.models.convention.get(req.params.conventionId, (err, convention) => {
        // if (err) throw err;
        // if (!convention) res.json({ success: false, error: 'Convention not found' });
        if (err) res.json({ success: false, error: 'Convention not found' });
        else convention.getRoom((err, room) => {
            if (err) throw err;
            room.getZones((err, zones) => {
                if (err) throw err;
                const zoneIds = zones.map(z => z.id);
                req.models.seat.find({ zone_id: zoneIds }, { autoFetch: true }, (err, seats) => {
                    if (err) throw err;
                    var seats0 = seats.map((seat) => {
                        seat.taken = false;
                        if (Array.isArray(seat.attendances)) {
                            seat.attendances = seat.attendances.filter(
                                attendance => attendance.convention_id == req.params.conventionId
                            );
                            seat.taken = seat.attendances.length > 0;
                        }
                        return seat;
                    })
                        .sort((a, b) => (a.zone_id < b.zone_id || (a.zone_id === b.zone_id && (a.row < b.row || (a.row === b.row && a.col < b.col)))) ? -1 : 0);
                    var seats1 = [];
                    var zoneOffset = seats0[0].zone_id;
                    for (var s of seats0) {
                        var zid = s.zone_id - zoneOffset;
                        if (!Array.isArray(seats1[zid])) seats1[zid] = [];
                        if (!Array.isArray(seats1[zid][s.row-1])) seats1[zid][s.row-1] = [];
                        seats1[zid][s.row-1][s.col-1] = s;
                    }
                    res.json(seats1);
                });
            });
        });
    });
});

function resetRoom1(models, cb) {
    // Auditorium
    var data = [
        { rows: 2, cols: 6, zone_id: 1 },
        { rows: 2, cols: 6, zone_id: 2 },
        { rows: 4, cols: [6, 8, 10, 8], zone_id: 3 }
    ];
    var data2 = [];
    for (var z of data) {
        for (var i = 1; i <= z.rows; i++) {
            if (Array.isArray(z.cols)) {
                for (var j = 1; j <= z.cols[i-1]; j++) {
                    data2.push({ zone_id: z.zone_id, row: i, col: j });
                }
            } else {
                for (var j = 1; j <= z.cols; j++) {
                    data2.push({ zone_id: z.zone_id, row: i, col: j });
                }
            }
        }
    }
    models.zone.find({ room_id: 1 }, (err, zones) => {
        if (err) cb(err); else {
            const zoneIds = zones.map(z => z.id);
            models.seat.find({ zone_id: zoneIds }).remove((err) => {
                if (err) cb(err);
                else models.seat.create(data2, cb);
            });
        }
    });
}

function resetRoom2(models, cb) {
    // Concert Hall
    var data = [
        { rows: 2, cols: 3, zone_id: 4 },
        { rows: 2, cols: 3, zone_id: 5 },
        { rows: 2, cols: 8, zone_id: 6 },
        { rows: 2, cols: 8, zone_id: 7 },
        { rows: 3, cols: 10, zone_id: 8 },
        { rows: 6, cols: 6, zone_id: 9 },
    ];
    var data2 = [];
    for (var z of data) {
        for (var i = 1; i <= z.rows; i++) {
            if (Array.isArray(z.cols)) {
                for (var j = 1; j <= z.cols[i-1]; j++) {
                    data2.push({ zone_id: z.zone_id, row: i, col: j });
                }
            } else {
                for (var j = 1; j <= z.cols; j++) {
                    data2.push({ zone_id: z.zone_id, row: i, col: j });
                }
            }
        }
    }
    models.zone.find({ room_id: 2 }, (err, zones) => {
        if (err) cb(err); else {
            const zoneIds = zones.map(z => z.id);
            models.seat.find({ zone_id: zoneIds }).remove((err) => {
                if (err) cb(err);
                else models.seat.create(data2, cb);
            });
        }
    });
}

function resetRoom3(models, cb) {
    // Lecture Hall
    var data = [
        { rows: 6, cols: [7, 9, 10, 11, 13, 15], zone_id: 10 },
    ];
    var data2 = [];
    for (var z of data) {
        for (var i = 1; i <= z.rows; i++) {
            if (Array.isArray(z.cols)) {
                for (var j = 1; j <= z.cols[i-1]; j++) {
                    data2.push({ zone_id: z.zone_id, row: i, col: j });
                }
            } else {
                for (var j = 1; j <= z.cols; j++) {
                    data2.push({ zone_id: z.zone_id, row: i, col: j });
                }
            }
        }
    }
    models.zone.find({ room_id: 3 }, (err, zones) => {
        if (err) cb(err); else {
            const zoneIds = zones.map(z => z.id);
            models.seat.find({ zone_id: zoneIds }).remove((err) => {
                if (err) cb(err);
                else models.seat.create(data2, cb);
            });
        }
    });
}

// function resetRoom3(Seat, cb) {
//     // Lecture Hall
//     var totalSeatsPerRow = ;
//     var data = [];
//     for (var n = 1; n <= totalSeatsPerRow.length; n++) {
//         for (var m = 1; m <= totalSeatsPerRow[n-1]; m++) {
//             data.push({
//                 zone_id: 10,
//                 row: n,
//                 col: m,
//             });
//         }
//     }
//     Seat.create(data, cb);
// }

function resetRoom4(models, cb) {
    // Conference Room
    var data = [
        { rows: 1, cols: 2, zone_id: 11 },
        { rows: 4, cols: 1, zone_id: 12 },
        { rows: 1, cols: 2, zone_id: 13 },
        { rows: 4, cols: 1, zone_id: 14 }
    ];
    var data2 = [];
    for (var z of data) {
        for (var i = 1; i <= z.rows; i++) {
            for (var j = 1; j <= z.cols; j++) {
                data2.push({ zone_id: z.zone_id, row: i, col: j });
            }
        }
    }
    models.zone.find({ room_id: 4 }, (err, zones) => {
        if (err) cb(err); else {
            const zoneIds = zones.map(z => z.id);
            models.seat.find({ zone_id: zoneIds }).remove((err) => {
                if (err) cb(err);
                else models.seat.create(data2, cb);
            });
        }
    });
}

router.get('/reset1', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        resetRoom1(req.models, (err, seats) => {
            if (err) throw err;
            res.json({ success: true, seats: seats });
        });
    }
});

router.get('/reset2', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        resetRoom2(req.models, (err, seats) => {
            if (err) throw err;
            res.json({ success: true, seats: seats });
        });
    }
});

router.get('/reset3', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        resetRoom3(req.models, (err, seats) => {
            if (err) throw err;
            res.json({ success: true, seats: seats });
        });
    }
});

router.get('/reset4', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        resetRoom4(req.models, (err, seats) => {
            if (err) throw err;
            res.json({ success: true, seats: seats });
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

router.get('/resync', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.seat.drop((err) => {
            if (err) throw err;
            req.models.seat.sync((err) => {
                if (err) throw err;
                res.json({ success: true });
            });
        });
    }
});

module.exports = router;
