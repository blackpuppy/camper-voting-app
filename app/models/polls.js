'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    userGitHubId: String,
    question: String,
    options: [{
        text: String,
        votes: Number
    }]
});

module.exports = mongoose.model('Poll', Poll);
