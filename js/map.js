'use strict';

(function () {
  var mapMarks = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < 8; j++) {
    fragment.appendChild(window.pin.getMapMarks(window.data.rentedAccommodations[j]));
  }
  mapMarks.appendChild(fragment);
  window.card.showDialogPanel(0);

  var pins = document.querySelectorAll('.pin');
  var dialogClose = document.querySelector('.dialog__close');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener('click', window.pin.clickPinHeandler);
    pins[i].setAttribute('data', i);
    pins[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.pin.clickPinHeandler(evt);
      }
    });
  }

  dialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.card.closeDialogPanel();
    }
  });

  dialogClose.addEventListener('click', function () {
    window.card.closeDialogPanel();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE && window.pin.activePin) {
      window.card.closeDialogPanel();
    }
  });
})();
