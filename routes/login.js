var express = require('express');
var router = express.Router();
var randomName = require('adjective-adjective-animal');
var changeCase = require('change-case');

router.get('/', function (req, res, next) {
    req.models.login.find({}, (err, logins) => {
        if (err) throw err;
        res.json(logins);
        // next();
    });
});

router.post('/new', function (req, res, next) {
    randomName(2).then((name) => {
        req.models.login.create({
            email: changeCase.camelCase(name) + '@gmail.com',
            password: '123',
            name: changeCase.titleCase(name)
        }, (err) => {
            if (err) throw err;
            res.json({ success: true });
            // next();
        });
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
