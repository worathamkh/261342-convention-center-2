var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/drop', (req, res) => {
//     if (req.query.magicword !== '123') {
//         res.json({ success: false });
//     } else {
//
//         res.json({ success: true });
//     }
// });

router.get('/api/resync', (req, res) => {
    if (req.query.magicword !== '123') {
        res.json({ success: false });
    } else {
        req.db.drop((err) => {
            if (err) throw err;
            req.db.sync((err) => {
                if (err) throw err;
                res.json({ success: true });
            });
        });
    }
});

module.exports = router;
