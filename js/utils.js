'use strict';

(function () {

  const DEBOUNCE_INTERVAL = 500;

  const getRandomInt = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const x = array[i];

      array[i] = array[j];
      array[j] = x;
    }
    return array;
  };

  const debounce = (cb) => {
    let lastTimeout = null;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getRandomInt,
    shuffleArray,
    debounce
  };

})();
