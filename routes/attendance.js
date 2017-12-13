var express = require('express');
var router = express.Router();
var orm = require('orm');
var async = require('async');
var R = require('random-js');
var E = R.engines.mt19937().autoSeed();

router.get('/all', (req, res) => {
    req.models.attendance.find({}, { autoFetch: true }, (err, attendances) => {
        if (err) throw err;
        res.json(attendances);
    });
});

router.post('/new/:attendeeId/:conventionId/:seatId', (req, res) => {
    req.models.attendance.creat({
        attendee_login_id: req.params.attendeeId,
        convention_id: req.params.conventionId,
        seat_id: req.params.seatId
    }, (err, attendance) => {
        if (err) throw err;
        res.json({ success: true, attendance: attendance });
    });
});

router.post('/gen', (req, res) => {
    req.models.attendee.find({}, (err, attendees) => {
        if (err) throw err;
        var attendee = attendees[R.integer(0, attendees.length-1)(E)];
        // console.log('Select attendee ', JSON.stringify(attendee));
        req.models.convention.find({
            // startTime: orm.gte(
            room_id: 3
        }, (err, conventions) => {
            if (err) throw err;
            var convention = conventions[R.integer(0, conventions.length-1)(E)];
            // console.log("Select convention ", JSON.stringify(convention));
            convention.getRoom((err, room) => {
                if (err) throw err;
                // console.log('Room for convention', JSON.stringify(room));
                room.getZones((err, zones) => {
                    if (err) throw err;
                    // console.log('All zones in room', JSON.stringify(zones));
                    const zoneIds = zones.map(zone => zone.id);
                    // console.log('Find zones from', JSON.stringify(zoneIds));
                    req.models.seat.find({
                        zone_id: zoneIds
                    }, (err, seats) => {
                        if (err) throw err;
                        // console.log('All seats', JSON.stringify(seats));
                        async.filter(seats, (seat, cb) => {
                            seat.isFreeBetween(convention.startTime, convention.endTime, cb);
                        }, (err, availableSeats) => {
                            if (err) throw err;
                            // console.log('Available seats', JSON.stringify(availableSeats));
                            var seat = availableSeats[R.integer(0, availableSeats.length-1)(E)];
                            // console.log('Select seat', JSON.stringify(seat));
                            req.models.attendance.create({
                                attendee_login_id: attendee.login_id,
                                convention_id: convention.id,
                                seat_id: seat.id
                            }, (err, attendance) => {
                                if (err) throw err;
                                res.json(attendance);
                            });
                        });
                    });
                });
            });
        });
    });
});

router.get('/clear', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.attendance.find({}).remove((err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    }
});

router.get('/resync', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.attendance.drop((err) => {
            if (err) throw err;
            req.models.attendance.sync((err) => {
                if (err) throw err;
                res.json({ success: true });
            });
        });
    }
});

module.exports = router;
