var globalTater = "I'm a global potato";

// this is a global function, it's available everywhere
function potato(honk) {
  console.log(honk);
}

// The danger of global variables is that they can be overwritten by other scripts,
// or you can accidentally overwrite them yourself.
// This is especially dangerous if you have something like utility functions that are used everywhere.
potato(globalTater);

// this is a revealing module pattern, which is a way to namespace or encapsulate code and
// only expose the parts you want to.
// it's a good way to keep your code organized and prevent global scope pollution
// https://gist.github.com/zcaceres/bb0eec99c02dda6aac0e041d0d4d7bf2
const revealingModule = (function() {
  const immutableVar = "I'm a constant";
  const loadedEvent = new Event("moduleLoaded");
  let mutableVar = 0;
  let debugMode = false;

  // This is a Set, which is a collection of unique values
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  const LOADED_SCRIPTS = new Set();

  // this is a private function, it's not exposed outside of the module
  // since it's not returned in the object at the end
  // it is also an arrow function, which is a newer way to define functions
  // Babel will transpile this to a regular function
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  const initResizeListeners = () => {
    if (debugMode) {
      console.debug("Resize listeners initialized");
    }

    window.addEventListener("resize", function () {
      if (debugMode) {
        console.debug("Resize event fired");
      }

      mutableVar = window.innerWidth;

      if (debugMode) {
        console.debug("Mutable var is now: ", mutableVar);
      }
    });
  };

  function onDocClick() {
    console.log("Click event fired");
  }

  function initEventListeners() {
    if (debugMode) {
      console.debug("Event listeners initialized");
    }

    document.addEventListener("click", function () {
      onDocClick();
    });
  }

  // This function will wait for a library to become available before executing a callback
  // It's recursive, so it will keep checking until the library is available
  function waitForLibrary(lib, callback, timeout) {
    if (window[lib]) {
      if (debugMode) {
        console.debug(`${lib} is available`);
      }

      callback();
    } else {
      console.warn(`${lib} is not available yet, waiting...`);
      setTimeout(() => {
        waitForLibrary(lib, callback);
      }, timeout);
    }
  }

  // This function will execute a callback when the document is ready
  // It will check if the document is already ready, and if so, execute the callback immediately
  function documentReady(fn) {
    document.addEventListener("DOMContentLoaded", () => {
      if (
        document.readyState === "interactive" ||
        document.readyState === "complete"
      ) {
        if (debugMode) {
          console.debug("Document is ready");
        }
        fn();
      }
    });
  }

  // this functino checks if a URL is valid
  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  // This function will inject a library into the page
  // It will only inject the library once, even if called multiple times
  function injectLibrary(url) {
    if (!isValidURL(url)) {
      console.error("Invalid URL:", url);
      return;
    }

    if (debugMode) {
      console.debug("Injecting library:", url);
    }

    if (LOADED_SCRIPTS.has(url)) {
      console.warn("Library already loaded, skipping:", url);
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.head.appendChild(script);

    LOADED_SCRIPTS.add(url);
  }

  // The init function is the entrypoint to the revealing module
  function init(debug = false) {
    console.info("Module started");
    if (debug) {
      debugMode = true;
    }

    // wait for jQuery to become available
    waitForLibrary(
      "jQuery",
      function () {
        initEventListeners();
        initResizeListeners();
      },
      100
    );

    // inject jQuery
    injectLibrary(
      "https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"
    );

    // dispatch a custom event when the module is loaded
    document.dispatchEvent(loadedEvent);
  }

  return {
    start: init,
    documentReady: documentReady,
  };
}());

// this will start the module. You could wrap this in a document ready event if you wanted
// revealingModule.start(true);
// here is a self-made doc ready function that isn't reliant on jQuery
// revealingModule.documentReady(revealingModule.start());
