'use strict';

var Users = require('../models/users.js');
var Polls = require('../models/polls.js');

function PollHandler () {

    this.getPolls = function (req, res) {
        Polls
            .findOne({'id': req.user.github.id})
            // TODO: next?
            .exec(function (err, result) {
                if (err) { throw err; }

                res.json(result);
            });
    };

    this.createPoll = function (req, res) {
        console.log('createPoll(): req.body = ', req.body);

        var options = [];
        req.body.options.forEach(function (o) {
            options.push({
                text: o,
                votes: 0
            });
        });
        var newPoll = new Poll({
            userGitHubId: req.user.github.id,
            question: req.body.question,
            options: options
        });

        console.log('new poll to save: ', newPoll);

        newPoll.save(function (err, poll) {
            if (err) { throw err; }

            console.log('saved new poll: ', poll);

            res.setHeader('Content-Type', 'application/json');
            res.json(JSON.stringify(poll));
        });
    };

    this.resetClicks = function (req, res) {
        Users
            .findOneAndUpdate({ 'github.id': req.user.github.id }, { 'nbrClicks.clicks': 0 })
            .exec(function (err, result) {
                    if (err) { throw err; }

                    res.json(result.nbrClicks);
                }
            );
    };

}

module.exports = PollHandler;
