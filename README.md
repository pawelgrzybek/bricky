# Bricky

A simple plugin to create Masonry / Pinterest style layout. A small demo is included inside the repository inside the 'demo' directory, or you can check it [here on CodePen](http://codepen.io/pawelgrzybek/pen/vGbzpW).

## How to use

You can use Bricky by directly injecting script into your document or via npm if you use any module bundlers like the popular [Browserify](http://browserify.org/) or powerful [Webpack](https://webpack.github.io/) bundler. It takes an object with some settings as the only parameter. Take a look at the example provided below.

### Options

```js
{
  parent: '.masonry',
  elements: 'article',
  gutter: '12px',
  breakpoints: [
    [600, 2],
    [900, 3],
    [1200, 4]
  ]
}
```

- parent (required / string) - string with jQuery style query where grid should be placed
- elements (required / string) - query with elements that should be added to Bricky layout
- gutter (optional / string) - gutter width in relative or absolute units
- breakpoints (optional / array) - this array is a collection of nested arrays. Each of them is constructed as `[breakpoint, columns]`. You can pass as many breakpoints as you want.

### Node style

In command line...

```
npm i -S bricky
```

In script file...

```js
var Bricky = require('bricky');

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

var test = new Bricky(pref);
test.start();
```

### Browser oldschool style

In document markup...

```html
<script src="../js/bricky.min.js"></script>
<script>
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

  var test = new Bricky(pref);
  test.start();
</script>
```

## Browser support

Bricky is using Flexible Box Layout Module. Accordingly to [Can I use stats](http://caniuse.com/#feat=flexbox) it has 94.04% of global support. Script is written in old-school ES5 way. Wherever the Flexbox is supported, Bricky will work fine.

- IE >= 10
- Edge >= 12
- Firefox >= 2
- Chrome >= 4
- Safari >= 3.1
- Opera >= 12.1
- iOS Safari >= 3.2
- Opera Mini >= 8
- Android Browser >= 2.1
- Blackberry Browser >= 7
- Opera Mobile >= 12.1
- Chrome for Android >= 50
- Firefox for Android >= 46
- IE Mobile >= 10
- UC Browser for Android >= 9.9
