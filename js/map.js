'use strict';

(function () {
  var inputAddress = document.getElementById('address');
  var fragment = document.createDocumentFragment();
  var mapMarks = document.querySelector('.tokyo__pin-map');
  window.map = {
    renderFragment: function (data) {
      for (var j = 0; j < data.length; j++) {
        fragment.appendChild(window.pin.getMapMarks(data[j]));
      }
      mapMarks.appendChild(fragment);
    }
  };

  var dialogClose = document.querySelector('.dialog__close');
  var ESC_KEYCODE = 27;

  dialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.showDialog.ENTER_KEYCODE) {
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

  window.pinCurentAd = document.querySelector('.pin__main');
  var insertAddressValue = function (x, y) {
    var pinPosition = 'x: ' + x + ', y: ' + y;
    inputAddress.setAttribute('value', pinPosition);
  };

  var pinX = parseInt(window.getComputedStyle(window.pinCurentAd).left, 10);
  var pinY = parseInt(window.getComputedStyle(window.pinCurentAd).top, 10);
  insertAddressValue(pinX + window.pin.PIN_WIDTH, pinY + window.pin.PIN_HEIGHT);

  window.pinCurentAd.addEventListener('mousedown', function (evt) {
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

      window.pinCurentAd.style.top = (window.pinCurentAd.offsetTop - shift.y) + 'px';
      window.pinCurentAd.style.left = (window.pinCurentAd.offsetLeft - shift.x) + 'px';
      var pinAddress = {
        y: window.pinCurentAd.offsetTop - shift.y + window.pin.PIN_HEIGHT,
        x: window.pinCurentAd.offsetLeft - shift.x + window.pin.PIN_WIDTH
      };
      insertAddressValue(pinAddress.x, pinAddress.y);
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
