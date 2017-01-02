'use strict';

var Users = require('../models/users.js');
var Poll = require('../models/polls.js');

function PollHandler () {

    this.getPolls = function (req, res) {
        Poll
            .find({'userGitHubId': req.user.github.id})
            .exec(function (err, polls) {
                if (err) { throw err; }

                // console.log('getPolls: polls = ', JSON.stringify(polls));

                res.render('polls/mypolls', {polls: polls});
            });
    };

    this.getPoll = function (req, res, next) {
        Poll
            .findOne({'_id': req.params.id})
            .exec(function (err, poll) {
                if (err) { throw err; }

                console.log('getPoll: poll = ', JSON.stringify(poll));

                // res.render('polls/mypoll', {poll: poll});

                req.poll = poll;
                return next();
            });
    };

    this.createPoll = function (req, res) {
        // console.log('createPoll(): req.body = ', req.body);

        // var options = [];
        // req.body.options.forEach(function (o) {
        //     options.push({
        //         text: o,
        //         votes: 0
        //     });
        // });
        var newPoll = new Poll({
            userGitHubId: req.user.github.id,
            question: req.body.question,
            options: req.body.options
        });

        console.log('new poll to save: ', newPoll);

        newPoll.save(function (err, poll) {
            if (err) { throw err; }

            // console.log('saved new poll: ', poll);

            res.setHeader('Content-Type', 'application/json');
            res.json({result: 'OK', poll: poll});
        });
    };

    this.deletePoll = function (req, res) {
        Poll
            .findOne({'_id': req.params.id})
            .remove()
            .exec(function (err, result) {
                if (err) { throw err; }

                res.setHeader('Content-Type', 'application/json');
                res.json({result: 'OK'});
            });
    };

}

module.exports = PollHandler;
