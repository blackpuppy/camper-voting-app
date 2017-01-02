'use strict';

var path = require('path');

var cwd = process.cwd();
var ClickHandler = require(cwd + '/app/controllers/clickHandler.server.js');
var PollHandler = require(cwd + '/app/controllers/pollHandler.server.js');

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
            res.sendFile(cwd + '/public/index.html');
        });

    app.route('/login')
        .get(function (req, res) {
            res.sendFile(cwd + '/public/login.html');
        });

    app.route('/logout')
        .get(function (req, res) {
            req.logout();
            res.redirect('/login');
        });

    app.route('/profile')
        .get(isLoggedIn, function (req, res) {
            res.sendFile(cwd + '/public/profile.html');
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
        .get(isLoggedIn, pollHandler.getPolls);

    app.route('/polls/new')
        .get(isLoggedIn, function (req, res) {
            // res.sendFile(cwd + '/public/newpoll.html');
            res.render('polls/newpoll');
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
        .get(isLoggedIn, pollHandler.getPoll, function (req, res) {
            var poll = req.poll;
            // console.log('/polls/:id: poll = ', JSON.stringify(poll));
            res.render('polls/mypoll', {poll: poll});
        });

    app.route('/polls/:id/vote')
        .get(pollHandler.getPoll, function (req, res) {
            var poll = req.poll;
            // console.log('/polls/:id/vote: poll = ', JSON.stringify(poll));
            res.render('polls/pollvote', {poll: poll});
        })
        .post(pollHandler.votePoll);

    app.route('/polls/:id/votes')
        .get(pollHandler.getPoll, function (req, res) {
            var poll = req.poll;
            // console.log('/polls/:id/votes: poll = ', JSON.stringify(poll));
            res.render('polls/pollvotes', {
                poll: poll,
                pollJson: JSON.stringify(poll)
            });
        })

    app.route('/api/polls')
        // .get(isLoggedIn, pollHandler.getPolls)
        .post(isLoggedIn, pollHandler.createPoll);

    app.route('/api/polls/:id')
        // .post(isLoggedIn, pollHandler.updatePoll)
        .delete(isLoggedIn, pollHandler.deletePoll);
};
