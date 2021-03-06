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

                res.render('polls/list', {polls: polls});
            });
    };

    this.getPoll = function (req, res, next) {
        Poll
            .findOne({'_id': req.params.id})
            .exec(function (err, poll) {
                if (err) {
                    // throw err;
                    req.poll = null;
                    return next();
                }

                // console.log('getPoll: poll = ', JSON.stringify(poll));

                // res.render('polls/view', {poll: poll});

                req.poll = poll;
                return next();
            });
    };

    this.createPoll = function (req, res) {
        // console.log('createPoll(): req.body = ', req.body);

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

    this.updatePoll = function (req, res) {
        console.log('updatePoll(): req.body = ', req.body);
        console.log('updatePoll(): req.params.id = ', req.params.id);

        Poll.findOneAndUpdate({
            _id: req.params.id,
        }, {
            $set: {
                question: req.body.question
            },
            $pushAll: {
                options: req.body.options
            }
        }, function (err, poll) {
            if (err) { throw err; }

            console.log('saved poll: ', poll);

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

    this.votePoll = function (req, res) {
        console.log('votePoll: req.body.vote = ', req.body.vote);

        Poll
            .findOneAndUpdate({
                '_id': req.params.id,
                'options.text': req.body.vote
            }, {
                $inc: {
                    'options.$.votes': 1
                }
            })
            .exec(function (err, poll) {
                if (err) { throw err; }

                // console.log('votePoll: saved poll = ', JSON.stringify(poll));

                res.redirect('/polls/' + poll._id + '/votes');
            });
    };

}

module.exports = PollHandler;
