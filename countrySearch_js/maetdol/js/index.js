import { searchCountry } from './api.js';
import { drawSearchResultWith } from './dom.js';
import { Focusmanager } from './focusManager.js';
import { $, capitalize, debounce } from './utils.js';

init();

function init() {
  $('form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  const focusGroup = new Focusmanager();
  const $input = $('input');
  focusGroup.addGroup($input, [$input]);

  const $result = $('.result');
  const debouncedSearchCountry = debounce((keyword) => {
    searchCountry(keyword)
      .then(drawSearchResultWith(keyword))
      .then(() => {
        focusGroup.removeGroup($result);
        const $resultItems = $result.querySelectorAll('li > button');
        focusGroup.addGroup($result, Array.from($resultItems));
      });
  }, 300);

  $input.addEventListener('input', (e) => {
    $result.innerHTML = '';
    if (!$input.value) return;

    $input.value = capitalize($input.value);
    debouncedSearchCountry($input.value);
  });
}
