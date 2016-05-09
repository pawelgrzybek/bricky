(function() {
  // Create a constructor function
  var Bricky = function(settings) {
    var pref = {
      parent: settings.parent,
      elements: settings.elements,
      gutter: settings.gutter || '1rem',
      breakpoints: settings.breakpoints || [[600, 2], [900, 3], [1200, 4]]
    };

    // define parent for bricky layout
    this.parent = document.querySelector(pref.parent);

    // loop through bricks and return as an array
    this.collectItems = function() {
      var divs = [];
      var elements = document.querySelectorAll(pref.elements);

      [].forEach.call(elements, function(item) {
        divs.push(item);
        item.remove();
      });

      return divs;
    };

    // Store all bricks in brickyItems variable
    this.brickyItems = this.collectItems();

    // Clear up the parent element before rendering
    this.clearParent = function() {
      this.parent.innerHTML = '';
    };

    // Clear the parent, create container, check how many and append new columns
    this.render = function() {
      this.clearParent();

      // create a flex wrapper & append to parent div
      var container = document.createElement('div');
      container.style.display = '-webkit-box';
      container.style.display = '-webkit-flex';
      container.style.display = '-ms-flexbox';
      container.style.display = 'flex';
      this.parent.appendChild(container);

      // check resolution and return number of columns needed
      function widthCheck() {
        var viewport = window.outerWidth;
        var breakpoints = pref.breakpoints;
        var breakpointsOrdered = breakpoints.sort(
          function(a, b) {
            return b[0] - a[0];
          }
        );

        for (var i = 0; i < breakpointsOrdered.length; i++) {
          if (viewport > breakpointsOrdered[i][0]) {
            return breakpointsOrdered[i][1];
          }
        }
        return 1;
      }


      // grab a result of widthCheck() function
      // create that many columns and add margin to each of them
      // don't add margin to last one
      var howManyColToCreate = widthCheck();
      for (var i = 0; i < howManyColToCreate; i++) {
        var masonryCol = document.createElement('div');
        masonryCol.style.width = 100 / howManyColToCreate + '%';
        if (i !== howManyColToCreate - 1) {
          masonryCol.style.marginRight = pref.gutter;
        }
        container.appendChild(masonryCol);
      }

      // loop through all columns
      // return the index of the shortest one
      function checkHeights() {
        var allCols = container.querySelectorAll('div');
        var allColsHeights = [];

        for (var i = 0; i < allCols.length; i++) {
          var sum = 0;
          for (var j = 0; j < allCols[i].querySelectorAll('*').length; j++) {
            sum += allCols[i].querySelectorAll('*')[j].clientHeight;
          }
          allColsHeights.push(sum);
        }

        return allColsHeights.indexOf(Math.min.apply(Math, allColsHeights));
      }

      for (var j = 0; j < this.brickyItems.length; j++) {
        var wichCol = checkHeights();
        container.querySelectorAll('div')[wichCol].appendChild(this.brickyItems[j]);
      }
    };

    // debounce, to dont trigger an event every single resized pixel
    this.debounce = function(func, wait, immediate) {
      var timeout = 0;
      return function() {
        var context = this;
        var args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 200);
        if (callNow) {
          func.apply(context, args);
        }
      };
    };

    // render bricky on load and on resize event
    this.start = function() {
      window.addEventListener('load', this.render());
      var self = this;
      window.addEventListener('resize', self.debounce(function() {
        self.render();
      }, 200));
    };
  };

  // export prototype to node & browser
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Bricky;
  }
  else {
    window.Bricky = Bricky;
  }
})();
