function potato(honk) {
  console.log(honk);
}

// this is a revealing module pattern, which is a way to encapsulate code and only expose the parts you want to
// it's a good way to keep your code organized and prevent global scope pollution
const revealingModule = (function() {
  const immutableVar = "I'm a constant";
  let mutableVar = "I'm a variable";

  const initResizeListeners = () => {
    console.info('Resize listeners initialized');
    window.addEventListener('resize', function() {
      console.log('Resize event fired');
    });
  }

  function initEventListeners() {
    console.info('Event listeners initialized');
    document.addEventListener('click', function() {
      console.log('Click event fired');
    });
  }

  // This function will wait for a library to become available before executing a callback
  // It's recursive, so it will keep checking until the library is available
  function waitForLibrary(lib, callback) {
    if (window[lib]) {
      callback();
    } else {
      setTimeout(() => {
        waitForLibrary(lib, callback);
      }, 100);
    }
  }

  // The init function is the entrypoint to the revealing module
  function init() {
    console.info('Module started');

    // wait for jQuery to become available
    waitForLibrary('jQuery', function() {
      console.log('jQuery is available');
      initEventListeners();
      initResizeListeners();
    });
  }

  return {
    start: init
  }
}());

// this will start the module. You could wrap this in a document ready event if you wanted
revealingModule.start();
