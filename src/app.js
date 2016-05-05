import Masonry from './plugin.js';

var pref = {
  parent: '.masonry',
  elements: 'article',
  gutter: '12px',
  breakpoints: [
    [600, 2],
    [900, 3],
    [1200, 4]
  ]
};

var test = new Masonry(pref);
// test.render();
window.addEventListener('load', test.render());
window.addEventListener('resize', test.debounce(function() {
  test.render();
}, 250));
