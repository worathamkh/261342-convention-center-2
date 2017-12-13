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
        if (err) throw err;
        convention.getRoom((err, room) => {
            if (err) throw err;
            room.getZones((err, zones) => {
                if (err) throw err;
                const zoneIds = zones.map(z => z.id);
                req.models.seat.find({ zone_id: zoneIds }, { autoFetch: true }, (err, seats) => {
                    if (err) throw err;
                    res.json(seats.map((seat) => {
                        seat.taken = false;
                        if (Array.isArray(seat.attendances)) {
                            seat.attendances = seat.attendances.filter(
                                attendance => attendance.convention_id == req.params.conventionId
                            );
                            seat.taken = seat.attendances.length > 0;
                        }
                        return seat;
                    }));
                });
            });
        });
    });
});

function resetRoom3(Seat, cb) {
    // Lecture Hall
    var totalSeatsPerRow = [7, 9, 10, 11, 13, 15];
    var data = [];
    for (var n = 1; n <= totalSeatsPerRow.length; n++) {
        for (var m = 1; m <= totalSeatsPerRow[n-1]; m++) {
            data.push({
                zone_id: 10,
                row: n,
                col: m,
            });
        }
    }
    Seat.create(data, cb);
}

router.get('/reset3', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        resetRoom3(req.models.seat, (err, seats) => {
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
