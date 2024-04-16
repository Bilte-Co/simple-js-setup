"use strict";

function potato(honk) {
  console.log(honk);
}
var revealingModule = function () {
  var immutableVar = "I'm a constant";
  var mutableVar = "I'm a variable";
  var initResizeListeners = function initResizeListeners() {
    console.info('Resize listeners initialized');
    window.addEventListener('resize', function () {
      console.log('Resize event fired');
    });
  };
  function initEventListeners() {
    console.info('Event listeners initialized');
    document.addEventListener('click', function () {
      console.log('Click event fired');
    });
  }
  function waitForLibrary(lib, callback) {
    if (window[lib]) {
      callback();
    } else {
      setTimeout(function () {
        waitForLibrary(lib, callback);
      }, 100);
    }
  }
  function init() {
    console.info('Module started');

    // wait for jQuery to become available
    waitForLibrary('jQuery', function () {
      console.log('jQuery is available');
      initEventListeners();
      initResizeListeners();
    });
  }
  return {
    start: init
  };
}();
revealingModule.start();