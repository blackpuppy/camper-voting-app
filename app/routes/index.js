'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport) {

    function isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }

    var clickHandler = new ClickHandler();
    var pollHandler = new PollHandler();

    app.route('/')
        .get(isLoggedIn, function (req, res) {
            res.sendFile(path + '/public/index.html');
        });

    app.route('/login')
        .get(function (req, res) {
            res.sendFile(path + '/public/login.html');
        });

    app.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/login');
        });

    app.route('/profile')
        .get(isLoggedIn, function (req, res) {
            res.sendFile(path + '/public/profile.html');
        });

    app.route('/api/:id')
        .get(isLoggedIn, function (req, res) {
            res.json(req.user.github);
        });

    app.route('/auth/github')
        .get(passport.authenticate('github'));

    app.route('/auth/github/callback')
        .get(passport.authenticate('github', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

    app.route('/api/:id/clicks')
        .get(isLoggedIn, clickHandler.getClicks)
        .post(isLoggedIn, clickHandler.addClick)
        .delete(isLoggedIn, clickHandler.resetClicks);

    app.route('/polls')
        .get(isLoggedIn, function (req, res) {
            // TODO: retrieve and show all my polls
            res.sendFile(path + '/public/mypolls.html');
        });

    app.route('/polls/new')
        .get(isLoggedIn, function (req, res) {
            res.sendFile(path + '/public/newpoll.html');
        });
        // .post(
        //     isLoggedIn,
        //     // pollHandler.createPoll,
        //     function (req, res, poll) {
        //         // res.redirect('/polls/' + poll._id);
        //         res.send('saved poll: ' + JSON.stringify(poll));
        //     }
        // );

    app.route('/polls/:id')
        .get(isLoggedIn, function (req, res) {
            // TODO: read poll by :id, and render it
            res.sendFile(path + '/public/mypoll.html');
        });

    app.route('/api/polls')
        // .get(isLoggedIn, pollHandler.getPolls)
        .post(isLoggedIn,
            pollHandler.createPoll
            // function (req, res) {   // test
            //     console.log('POST /api/polls: req.body = ', req.body);

            //     res.setHeader('Content-Type', 'application/json');
            //     // res.write('you posted:\n');
            //     res.end(JSON.stringify(req.body, null, 2));
            // }
        );

    // app.route('/api/polls/:id')
    //     .post(isLoggedIn, pollHandler.updatePoll)
    //     .delete(isLoggedIn, pollHandler.deletePolls);
};
