'use strict';

(function () {

  const getRandomInt = function (min, max) {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  const shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  };

  window.utils = {
    getRandomInt: getRandomInt,
    shuffleArray: shuffleArray
  };

})();
