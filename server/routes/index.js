const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
var url = require("url");


const mongoose = require('mongoose');
const Site = mongoose.model('Site');


router.use((req, res, next) => {
    console.log('recieving something');

    next();
});

router.route('/sites')
    .post((req, res) => {
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl + '/';

        const site = new Site();
        site.title = req.body.title;
        site.url = req.body.url;
        site.date = req.body.date;
        site._links.self.href = fullUrl + site._id;
        site._links.collection.href = fullUrl;

        site.save((err) => {
            if(err)
                res.send(err);

            res.json({ Message: 'Site added!'});
        })
    })
    .get((req, res) => {
        Site.find((err, sites) => {
            if(err)
                return res.send(err);
            res.json(sites);
        })
    });

router.route('/sites/:site_id')
    .get((req, res) => {
        Site.findById(req.params.site_id, (err, site) => {
            if(err)
                return res.send(err);
            res.json(site);
        })
    })
    .put((req, res) => {
        Site.findById(req.params.site_id, (err, site) => {
            site.url = req.body.url;

            site.save((err) => {
                if(err)
                    res.send(err);
                res.json({Message : 'Updated'});
            })
        })
    })
    .delete((req, res) => {
        Site.remove(req.params.site_id, (err, site) => {
            if(err)
                res.send(err)
            res.json({Message: 'Deleted!'});
        })
    })

// router.get('*', (req, res) => {
//   res.render('index');
// });

app.use('/api', router);

module.exports = router;
