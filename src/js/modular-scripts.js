var globalTater = "I'm a global potato";

// this is a global function, it's available everywhere
function potato(honk) {
  console.log(honk);
}

// The danger of global variables is that they can be overwritten by other scripts,
// or you can accidentally overwrite them yourself
potato(globalTater);

// this is a revealing module pattern, which is a way to namespace or encapsulate code and
// only expose the parts you want to.
// it's a good way to keep your code organized and prevent global scope pollution
// https://gist.github.com/zcaceres/bb0eec99c02dda6aac0e041d0d4d7bf2
const revealingModule = (function() {
  const immutableVar = "I'm a constant";
  let mutableVar = 0;

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
      mutableVar = window.innerWidth;
      console.log("Mutable var is now: ", mutableVar);
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
  function waitForLibrary(lib, callback, timeout) {
    if (window[lib]) {
      console.info(`${lib} is available`);
      callback();
    } else {
      console.warn(`${lib} is not available yet, waiting...`);
      setTimeout(() => {
        waitForLibrary(lib, callback);
      }, timeout);
    }
  }

  function documentReady(fn) {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.readyState === "interactive" || document.readyState === "complete") {
        console.info("Document is ready");
        fn();
      }
    });
  }

  function injectLibrary(url) {
    console.info("Injecting library:", url);
    if (LOADED_SCRIPTS[url]) {
      console.warn("Library already loaded, skipping:", url);
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

    // wait for jQuery to become available
    waitForLibrary("jQuery", function () {
      initEventListeners();
      initResizeListeners();
    }, 100);

    // inject jQuery
    injectLibrary("https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js");
  }

  return {
    start: init,
    documentReady: documentReady
  };
}());

// this will start the module. You could wrap this in a document ready event if you wanted
revealingModule.start();
// here is a self-made doc ready function that isn't reliant on jQuery
// revealingModule.documentReady(revealingModule.start());
