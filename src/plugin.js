(function(global) {
  function Masonry(settings) {
    // define parent element that should be contain tales
    this.parent = document.querySelector(settings.parent);

    // remove elements from DOM & store them in masonryItems
    this.collectItems = function() {
      var divs = [];
      for (let item of document.querySelectorAll(settings.elements)) {
        divs.push(item);
        item.remove();
      }
      return divs;
    };
    this.masonryItems = this.collectItems();
    this.clearDOM = function() {
      this.parent.innerHTML = '';
    };

    this.render = function() {
      this.clearDOM();

      // create a flex wrapper & append to parent div
      var container = document.createElement('div');
      container.style.display = '-webkit-box';
      container.style.display = '-webkit-flex';
      container.style.display = '-ms-flexbox';
      container.style.display = 'flex';
      this.parent.appendChild(container);

      // check resolution and return number of columns needed
      this.resCheck = function() {
        var viewport = window.outerWidth;
        var breakpoints = settings.breakpoints;
        var breakpointsOrdered = breakpoints.sort(
          function(a, b) {
            return b[0] - a[0];
          }
        );

        for (let breakpoint of breakpointsOrdered) {
          if (viewport > breakpoint[0]) {
            return breakpoint[1];
          }
        }
        return 1;
      };


      // grab a result of resCheck() function
      // create that many columns and add margin to each of them
      // dont add margin to last one
      this.createCols = function() {
        var howManyColToCreate = this.resCheck();

        for (var i = 0; i < howManyColToCreate; i++) {
          let masonryCol = document.createElement('div');
          masonryCol.style.width = `${100 / howManyColToCreate}%`;
          if (i !== howManyColToCreate - 1) {
            masonryCol.style.marginRight = settings.gutter;
          }
          container.appendChild(masonryCol);
        }
      };
      this.createCols();

      // loop through all columns
      // return wich of them is the shortest one
      function checkHeights() {
        var allCols = container.querySelectorAll('div');
        var allColsHeights = [];

        for (let col of allCols) {
          var sum = 0;
          for (let elm of col.querySelectorAll('*')) {
            sum += elm.clientHeight;
          }
          allColsHeights.push(sum);
        }
        return allColsHeights.indexOf(Math.min(...allColsHeights));
      }

      for (var i = 0; i < this.masonryItems.length; i++) {
        var wichCol = checkHeights();
        container.querySelectorAll('div')[wichCol].appendChild(this.masonryItems[i]);
      }
    };

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
  }

  // export prototype to npm & global scope
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Masonry;
  }
  else {
    global['Masonry'] = Masonry;
  }
})(this);
