var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    req.models.login.find({}, (err, logins) => {
        if (err) throw err;
        res.json(logins);
        // next();
    });
});

router.post('/new', function (req, res, next) {
    req.models.login.create({
        email: 'johndoe' + Math.floor(1000 + Math.random() * 9000) + '@gmail.com',
        password: Math.floor(1000 + Math.random() * 9000) + '' + Math.floor(1000 + Math.random() * 9000),
        name: 'John Doe'
    }, (err) => {
        if (err) throw err;
        res.json({ success: true });
        // next();
    });
});

module.exports = router;
