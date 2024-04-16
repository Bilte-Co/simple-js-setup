function potato(honk) {
  console.log(honk);
}

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

  function waitForLibrary(lib, callback) {
    if (window[lib]) {
      callback();
    } else {
      setTimeout(() => {
        waitForLibrary(lib, callback);
      }, 100);
    }
  }

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

revealingModule.start();
