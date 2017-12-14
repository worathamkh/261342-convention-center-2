var express = require('express');
var router = express.Router();
var randomName = require('adjective-adjective-animal');
var changeCase = require('change-case');

router.get('/', function (req, res) {
    req.models.login.find({}, (err, logins) => {
        if (err) throw err;
        res.json(logins);
    });
});

router.post('/signup', (req, res) => {
    if (req.body.role === 'host' || req.body.role === 'attendee') {
        req.models.login.create({
            email: req.body.email,
            password: req.body.pass,
            name: req.body.name
        }, (err, login) => {
            if (err) throw err;
            if (req.body.role === 'host') {
                login.setHost(new req.models.host({}), (err) => {
                    if (err) throw err;
                    res.json({ success: true, login_id: login.id });
                });
            } else {
                login.setAttendee(new req.models.attendee({}), (err) => {
                    if (err) throw err;
                    res.json({ success: true, login_id: login.id });
                });
            }
        });
    } else {
        res.json({ success: false, error: 'invalid role; you sent ' + req.body.role });
    }
});

router.post('/signin', (req, res) => {
    req.models.login.find({ email: req.body.email, password: req.body.pass }, (err, logins) => {
        if (err) throw err;
        if (logins.length === 0) res.json({ success: false });
        else {
            res.json({ success: true, login_id: logins[0].id });
        }
    });
});

router.get('/clear', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.login.find({}).remove((err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    }
});

module.exports = router;
