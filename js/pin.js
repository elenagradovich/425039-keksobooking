'use strict';

(function () {
  var clickedPin = null;
  window.pin = {
    activePin: document.getElementsByClassName('pin--active'),
    PIN_WIDTH: 56,
    PIN_HEIGHT: 75,
    getMapMarks: function (rentedAccommodation) {
      var divMapMark = document.createElement('div');

      divMapMark.className = 'pin';
      divMapMark.setAttribute('style', 'left: ' + (rentedAccommodation.location.x - window.pin.PIN_WIDTH / 2) +
        'px; top: ' + (rentedAccommodation.location.y - window.pin.PIN_HEIGHT) + 'px');
      divMapMark.insertAdjacentHTML('afterbegin', '<img src="' + rentedAccommodation.author.avatar +
        '" class="rounded" width="40" height="40">');
      divMapMark.setAttribute('tabindex', 0);
      return divMapMark;
    },

    clickPinHeandler: function (evt) {
      var hiddenDialog = document.getElementById('offer-dialog');

      if (hiddenDialog.classList[1] === 'hidden') {
        hiddenDialog.classList.remove('hidden');
      }

      if (clickedPin) {
        clickedPin.classList.remove('pin--active');
      }

      clickedPin = evt.currentTarget;
      clickedPin.classList.add('pin--active');
      var index = clickedPin.getAttribute('data');
      window.card.showDialogPanel(index - 1);
    },

    removePinActiveClass: function () {
      window.pin.activePin[0].classList.remove('pin--active');
    }
  };
})();
