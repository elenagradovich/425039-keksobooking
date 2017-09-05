'use strict';

(function () {
  var mapMarks = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  var inputAddress = document.getElementById('address');

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

  var pinCurentAd = document.querySelector('.pin__main');

  pinCurentAd.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startingPinPosition = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startingPinPosition.x - moveEvt.clientX,
        y: startingPinPosition.y - moveEvt.clientY
      };

      startingPinPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinCurentAd.style.top = (pinCurentAd.offsetTop - shift.y) + 'px';
      pinCurentAd.style.left = (pinCurentAd.offsetLeft - shift.x) + 'px';
      var pinAddress = {
        y: pinCurentAd.offsetTop - shift.y - window.pin.PIN_HEIGHT,
        x: pinCurentAd.offsetLeft - shift.x - (window.pin.PIN_WIDTH / 2)
      };
      var pinPosition = 'x: ' + pinAddress.x + ', y: ' + pinAddress.y;
      inputAddress.setAttribute('value', pinPosition);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
