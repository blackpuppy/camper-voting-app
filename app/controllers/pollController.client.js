'use strict';

(function() {

    var optionContainer = document.querySelector('.option-container');
    var addOptButton = document.querySelector('.btn-add-option');
    var submitNewPollButton = document.querySelector('.btn-submit-new-poll');
    var deletePollButton = document.querySelector('.btn-delete-poll');
    var listApiUrl = appUrl + '/api/polls';
    // var itemApiUrl = appUrl + '/api/polls/:id';

    addOptButton &&
    addOptButton.addEventListener('click', function(e) {
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

    submitNewPollButton &&
    submitNewPollButton.addEventListener('click', function(e) {
        e.preventDefault();

        var options = [];
        document.getElementsByName('option[]').forEach(function(input) {
            options.push({
                text: input.value,
                votes: 0
            });
        });
        var poll = {
            question: document.getElementsByName('question')[0].value,
            options: options
        };

        console.log('form submit: poll = ', poll);

        ajaxFunctions.ajaxRequest('POST', listApiUrl, function(data) {
            var result = JSON.parse(data);

            if (result.result === 'OK') {
                window.location.replace('/polls/' + result.poll._id);
            }
        }, JSON.stringify(poll));
    }, false);

    deletePollButton &&
    deletePollButton.addEventListener('click', function(e) {
        e.preventDefault();

        var id = deletePollButton.getAttribute('data-poll-id');
        // console.log('deletePollButton.data-poll-id = ', id);

        var deleteApiUrl = listApiUrl + '/' + id;
        ajaxFunctions.ajaxRequest('DELETE', deleteApiUrl, function(data) {
            console.log('DELETE ', deleteApiUrl, ': data = ', data);
            var result = JSON.parse(data);
            console.log('DELETE ', deleteApiUrl, ': result = ', result);

            if (result.result === 'OK') {
                window.location.replace('/polls');
            }
        });
    }, false);
})();
