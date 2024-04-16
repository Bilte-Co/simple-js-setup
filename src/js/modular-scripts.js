function potato(honk) {
  console.log(honk);
}

// this is a revealing module pattern, which is a way to encapsulate code and only expose the parts you want to
// it's a good way to keep your code organized and prevent global scope pollution
// https://gist.github.com/zcaceres/bb0eec99c02dda6aac0e041d0d4d7bf2
const revealingModule = (function() {
  const immutableVar = "I'm a constant";
  let mutableVar = "I'm a variable";

  // This is a map to track which scripts have been loaded
  // We don't want to load the same script multiple times
  const LOADED_SCRIPTS = {};

  // this is a private function, it's not exposed outside of the module
  // since it's not returned in the object at the end
  // it is also an arrow function, which is a newer way to define functions
  // Babel will transpile this to a regular function
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  const initResizeListeners = () => {
    console.info("Resize listeners initialized");
    window.addEventListener("resize", function () {
      console.log("Resize event fired");
    });
  };

  function initEventListeners() {
    console.info("Event listeners initialized");
    document.addEventListener("click", function () {
      console.log("Click event fired");
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

  function documentReady(fn) {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.readyState === "interactive" || document.readyState === "complete") {
        fn();
      }
    });
  }

  function injectLibrary(url) {
    if (LOADED_SCRIPTS[url]) {
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.head.appendChild(script);

    LOADED_SCRIPTS[url] = true;
  }

  // The init function is the entrypoint to the revealing module
  function init() {
    console.info("Module started");

    // inject jQuery
    injectLibrary("https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js");

    // wait for jQuery to become available
    waitForLibrary("jQuery", function () {
      console.log("jQuery is available");
      initEventListeners();
      initResizeListeners();
    });
  }

  return {
    start: init,
    documentReady: documentReady
  };
}());

// this will start the module. You could wrap this in a document ready event if you wanted

revealingModule.documentReady(revealingModule.start());
