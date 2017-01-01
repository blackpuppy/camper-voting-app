'use strict';

(function () {

    var optionContainer = document.querySelector('.option-container');
    var addButton = document.querySelector('.btn-add-option');
    var submitButton = document.querySelector('.btn-submit');
    var apiUrl = appUrl + '/api/polls';

    addButton.addEventListener('click', function (e) {
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

    submitButton.addEventListener('click', function (e) {
        e.preventDefault();

        var form = document.querySelector('form');
        var questionField = document.getElementsByName('question')[0];
        var optionFields = document.getElementsByName('option[]');

        console.log('form submit: optionFields = ', optionFields);

        var options = [];
        optionFields.forEach(function (input) {
            options.push({
                text: input.value,
                votes: 0
            });
        });

        // var poll = new FormData(form);
        var poll = {
            question: questionField.value,
            options: options
        };

        // console.log('form submit: form = ', form);
        console.log('form submit: poll = ', poll);

        ajaxFunctions.ajaxRequest('POST', apiUrl, function (data) {
            var poll = JSON.parse(data);

            console.log('returned poll = ', poll);

            // window.location.replace('/polls/' + poll._id);
        }, JSON.stringify(poll));
    }, false);
})();
