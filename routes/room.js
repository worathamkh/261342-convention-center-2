var express = require('express');
var router = express.Router();
var randomName = require('adjective-adjective-animal');
var changeCase = require('change-case');

router.get('/', (req, res) => {
    req.models.room.find({}, (err, rooms) => {
        if (err) throw err;
        res.json(rooms);
        // next();
    });
});

router.get('/reset', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.room.find({}).remove((err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    }
});

router.get('/clear', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.models.room.find({}).remove((err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    }
});

module.exports = router;
