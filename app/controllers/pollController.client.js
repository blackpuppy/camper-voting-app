'use strict';

(function () {

   var optionContainer = document.querySelector('.option-container');
   var addButton = document.querySelector('.btn-add-option');

   addButton.addEventListener('click', function (e) {
      e.preventDefault();

      // console.debug('.btn-add-option clicked:');

      // var content = document.createTextNode('<br>');
      // optionContainer.appendChild(content);

      // content = document.createTextNode('<input>');
      // // content.setAttribute('type', 'text');
      // // content.setAttribute('name', 'option[]');
      // // content.setAttribute('class', 'profile-value');
      // // content.setAttribute('placeholder', 'New Option');
      // optionContainer.appendChild(content);

      optionContainer.innerHTML +=
         '<br><input type="text" name="option[]" class="profile-value" placeholder="New Option" required>';
   }, false);
})();
