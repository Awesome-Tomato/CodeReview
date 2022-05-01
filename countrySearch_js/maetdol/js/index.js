import { searchCountry } from './api.js';
import { $, debounce } from './utils.js';

init();

function init() {
  $('form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $('input').addEventListener(
    'input',
    debounce((e) => {
      $('.result').innerHTML = '';
      searchCountry(e.target.value).then((result) => {
        result.forEach((country) => {
          const li = document.createElement('li');
          const button = document.createElement('button');
          button.setAttribute('type', 'button');
          button.innerText = country;
          li.append(button);
          $('.result').append(li);
        });
      });
    }, 300)
  );
}
