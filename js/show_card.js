'use strict';

(function () {
  window.showDialog = {
    ENTER_KEYCODE: 13,
    showCard: function () {
      var pins = document.querySelectorAll('.pin');
      for (var i = 0; i < pins.length; i++) {
        pins[i].addEventListener('click', window.pin.clickPinHandler);
        pins[i].setAttribute('data', i);
        pins[i].addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.showDialog.ENTER_KEYCODE) {
            window.pin.clickPinHandler(evt);
          }
        });
      }
    }
  };
})();
