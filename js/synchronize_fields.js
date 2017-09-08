'use strict';

(function () {
  window.synchronizeFields = function (element1, element2, callback) {
    callback(element1.value, element2);
  };
})();

