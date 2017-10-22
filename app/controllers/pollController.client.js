'use strict';

(function () {

    var addEventListenerList = function (list, event, fn) {
        for (var i = 0, len = list.length; i < len; i++) {
            list[i].addEventListener(event, fn, false);
        }
    }

    var optionContainer = document.querySelector('.option-container'),
        addOptButton = document.querySelector('.btn-add-option'),
        saveNewPollButton = document.querySelector('.btn-save-new-poll'),
        savePollButton = document.querySelector('.btn-save-poll'),
        submitVoteButton = document.querySelector('.btn-submit-vote'),
        deletePollButton = document.querySelectorAll('.btn-delete-poll'),
        apiUrl = appUrl + '/api/polls';

    addOptButton &&
    addOptButton.addEventListener('click', function (e) {
        e.preventDefault();

        // console.log('.btn-add-option clicked:');

        var content = document.createElement('br');
        optionContainer.appendChild(content);

        content = document.createElement('input');
        content.setAttribute('type', 'text');
        content.setAttribute('name', 'option[]');
        content.setAttribute('class', 'profile-value');
        content.setAttribute('placeholder', 'New Option');
        content.required = true;
        optionContainer.appendChild(content);
    }, false);

    saveNewPollButton &&
    saveNewPollButton.addEventListener('click', function (e) {
        e.preventDefault();

        var options = [];
        document.getElementsByName('option[]').forEach(function (input) {
            options.push({
                text: input.value,
                votes: 0
            });
        });
        var poll = {
            question: document.getElementsByName('question')[0].value,
            options: options
        };

        console.log('form save new: poll = ', poll);

        ajaxFunctions.ajaxRequest('POST', apiUrl, function (data) {
            var result = JSON.parse(data);

            if (result.result === 'OK') {
                window.location.replace('/polls/' + result.poll._id);
            }
        }, JSON.stringify(poll));
    }, false);

    savePollButton &&
    savePollButton.addEventListener('click', function (e) {
        e.preventDefault();

        var options = [];
        document.getElementsByName('option[]').forEach(function (input) {
            if (!input.hasAttribute('disabled')) {
                options.push({
                    text: input.value
                });
            }
        });
        var poll = {
            _id: document.getElementsByName('_id')[0].value,
            question: document.getElementsByName('question')[0].value,
            options: options
        };

        console.log('save existing poll = ', poll);

        ajaxFunctions.ajaxRequest('PUT', apiUrl + '/' + poll._id, function (data) {
            var result = JSON.parse(data);

            console.log('return result = ', result);

            if (result.result === 'OK') {
                window.location.replace('/polls/' + result.poll._id);
            }
        }, JSON.stringify(poll));
    }, false);

    deletePollButton &&
    addEventListenerList(deletePollButton, 'click', function (e) {
        // console.log('deletePollButton clicked');

        e.preventDefault();

        var id = this.getAttribute('data-poll-id');
        // console.log('deletePollButton.data-poll-id = ', id);

        var deleteApiUrl = apiUrl + '/' + id;
        // console.log('deleteApiUrl = ', deleteApiUrl);

        if (!confirm('Are you sure you want to delete the poll?')) {
            return;
        }

        ajaxFunctions.ajaxRequest('DELETE', deleteApiUrl, function (data) {
            console.log('DELETE ', deleteApiUrl, ': data = ', data);
            var result = JSON.parse(data);
            console.log('DELETE ', deleteApiUrl, ': result = ', result);

            if (result.result === 'OK') {
                window.location.replace('/polls');
            }
        });
    });
})();
