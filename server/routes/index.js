const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const Site = mongoose.model('Site');

//            res.header('allow', 'GET,PUT,DELETE,OPTIONS');

router.use( (req, res, next) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl + '/';
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, accept');

    if(req.accepts('application/json') || req.accepts('application/x-www-form-urlencoded')){
        if(req.get('accept') === '*/*'){
            return res.send(406, 'Unsupported method');
        } 
        return next();
    }
    else{
        res.send(406, 'Unsupported method');
    }
});
router.route('/sites')
    .get((req, res) => {
        const perPage = req.query.limit;
        let page = parseInt(req.query.start);
        let previousPage = 1;
        Site.find({}).skip((perPage * page) - perPage).limit(perPage).exec(function(err, sites) {
            Site.count().exec(function(err, count) {
                let totalPages = Math.ceil(count / perPage)
                let nextPage = page;
                console.log(nextPage);
                if(page > 1){
                    previousPage = page - 1;
                }
                else{
                    previousPage = 1;
                }
                let response = {
                    items: sites,
                    _links: {
                        self:{
                            href: 'http://45.63.12.46:8080/sites'
                        }
                    },
                    pagination: {
                        currentPage: page,
                        currentItems: sites.length,
                        totalPages: totalPages,
                        totalItems: count,

                        _links: {
                            first: {
                                page: 1,
                                href: 'http://45.63.12.46:8080/sites/limit=' + perPage + '&start=1'
                            },
                            last: {
                                page: totalPages,
                                href: 'http://45.63.12.46:8080/sites/limit=' + perPage + '&start=' + totalPages
                            },
                            previous: {
                                page: previousPage,
                                href: 'http://45.63.12.46:8080/sites/limit=' + perPage + '&start=' + previousPage
                            },                        
                            next: {
                                page: ++nextPage,
                                href: 'http://45.63.12.46:8080/sites/limit=' + perPage + '&start=' + nextPage
                            }
                        }
                    },
                }
            if(err)
                return res.json(err);
            res.json(response)   
            });
        });
    })
    .options((req, res) => {
        res.header('allow', 'GET,POST,OPTIONS');
        res.sendStatus(200);
    })
router.route('/sites/start=:start')
    .get((req, res) => {
        const perPage = 5;
        let page = req.params.start;
        Site.find({}).skip((perPage * page) - perPage).limit(perPage).exec(function(err, sites) {
            Site.count().exec(function(err, count) {
                //const nextPage = page++;
                let previousPage = '';
                let totalPages = Math.ceil(count / perPage)
                let firstPage = 1;
                if(page > 1){
                    previousPage = page - 1;
                }else{
                    previousPage = 1;
                }
                let response = {
                    items: sites,
                    _links: {
                        self:{
                            href: 'http://45.63.12.46:8080/sites'
                        }
                    },
                    pagination: {
                        currentPage: page,
                        currentItems: sites.length,
                        totalPages: totalPages,
                        totalItems: count,

                        _links: {
                            first: {
                                page: 1,
                                href: 'http://45.63.12.46:8080/sites/start=' + firstPage
                            },
                            last: {
                                page: totalPages,
                                href: 'http://45.63.12.46:8080/sites/start=' + totalPages
                            },
                            previous: {
                                page: previousPage,
                                href: 'http://45.63.12.46:8080/sites/start=' + previousPage
                            },                        
                            next: {
                                page: page++,
                                href: 'http://45.63.12.46:8080/sites/start=' + page++
                            }
                        }
                    },
                }
            if(err)
                return res.json(err);
            res.json(response)   
            });
        });
    })
    .options((req, res) => {
        res.header('allow', 'GET,POST,OPTIONS');
        res.sendStatus(200);
    })



router.route('/sites')
    .post((req, res) => {
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl + '/';
        if(!req.body.title || !req.body.url || !req.body.date){
            res.send(404, 'No content');
        }
        else{
            const site = new Site();
            site.title = req.body.title;
            site.url = req.body.url;
            site.date = req.body.date;
            site._links.self.href = fullUrl + site._id;
            site._links.collection.href = fullUrl;

            site.save((err) => {
                if(err)
                   return res.json(err);

                res.send(201, 'POSTED');
            })
        }
    })
    .get((req, res) => {
        Site.find((err, sites) => {
            // const currentPage
            let response = {
                items: sites,
                _links: {
                    self:{
                        href: 'http://45.63.12.46:8080/sites'
                    }
                },
                pagination: {
                    currentPage: 1,
                    currentItems: sites.length,
                    totalPages: 1,
                    totalItems: sites.length,

                    _links: {
                        first: {
                            page: 1,
                            href: 'http://45.63.12.46:8080/sites'
                        },
                        last: {
                            page: 1,
                            href: 'http://45.63.12.46:8080/sites'
                        },
                        previous: {
                            page: 1,
                            href: 'http://45.63.12.46:8080/sites'
                        },                        
                        next: {
                            page: 1,
                            href: 'http://45.63.12.46:8080/sites'
                        }
                    }
                },
            }

            if(err)
                return res.json(err);
            res.json(response)            
        })
    })
    .options((req, res) => {
        res.header('allow', 'GET,POST,OPTIONS');
        res.sendStatus(200);
    })

router.route('/sites/:site_id')
    .get((req, res) => {
        Site.findById(req.params.site_id, (err, site) => {
            if(!site){
                return res.send(404, 'not existing');
            }
            res.json(site);
        })
    })
    .put((req, res) => {
        Site.findById(req.params.site_id, (err, site) => {
            if(!req.body.title || !req.body.url || !req.body.date){
                res.send(404, 'No content');
            }else{
                site.title = req.body.title;
                site.url = req.body.url;
                site.date = req.body.date;

                site.save((err) => {
                    if(err)
                       return res.json(err);
                    res.send(200, 'UPDATED');
                })
            }
        })
    })
    .delete((req, res) => {
        Site.findOneAndRemove({'_id': req.params.site_id}, (err, site) => {
            if(err)
                return res.json(err)
            res.send(204, 'DELETED');
        })
    })
    .options((req, res) => {
        res.header('allow', 'GET,PUT,DELETE,OPTIONS');
        res.sendStatus(200);
    })

router.route('/sites/:page')
    // .get((req, res) => {
    //     const perPage = 5;
    //     const page = req.params.page;
    //     console.log(page);
    //     Site.find({}).skip((perPage * page) - perPage).limit(perPage).exec(function(err, sites) {
    //         Site.count().exec(function(err, count) {
    //             if (err) return next(err)
    //             res.json(site);
    //         });
    //     });
    // });
    .get((req, res) => {
        Site.find((err, sites) => {
            // const currentPage
            let response = {
                items: sites,
                _links: {
                    self:{
                        href: 'http://45.63.12.46:8080/sites'
                    }
                },
                pagination: {
                    currentPage: 1,
                    currentItems: sites.length,
                    totalPages: 1,
                    totalItems: sites.length,

                    _links: {
                        first: {
                            page: 1,
                            href: 'http://45.63.12.46:8080/sites'
                        },
                        last: {
                            page: 1,
                            href: 'http://45.63.12.46:8080/sites'
                        },
                        previous: {
                            page: 1,
                            href: 'http://45.63.12.46:8080/sites'
                        },                        
                        next: {
                            page: 1,
                            href: 'http://45.63.12.46:8080/sites'
                        }
                    }
                },
            }

            if(err)
                return res.json(err);
            res.json(response)            
        })
    })

// router.get('*', (req, res) => {
//     res.send('shit', 404);
//  // res.render('index');
// });

app.use('/api', router);

module.exports = router;
