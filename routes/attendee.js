var express = require('express');
var router = express.Router();
var randomName = require('adjective-adjective-animal');
var changeCase = require('change-case');

router.get('/', (req, res) => {
    req.models.attendee.find({}, { autoFetch: true}, (err, attendees) => {
        if (err) throw err;
        res.json(attendees);
        // next();
    });
});

router.post('/gen', (req, res) => {
    randomName(1).then((name) => {
        req.models.login.create({
            email: changeCase.camelCase(name) + '@gmail.com',
            password: '123',
            name: changeCase.titleCase(name),
        }, (err, login) => {
            if (err) throw err;
            login.setAttendee(new Attendee({}), (err) => {
                if (err) throw err;
                res.json({ success: true });
            });
        });
    });
});

router.get('/clear', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.attendee.find({}).remove((err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    }
});

module.exports = router;
