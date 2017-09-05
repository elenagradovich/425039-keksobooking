'use strict';

(function () {
  var clickedPin = null;
  window.pin = {
    activePin: document.getElementsByClassName('pin--active'),

    getMapMarks: function (rentedAccommodation) {
      var divMapMark = document.createElement('div');
      var PIN_WIDTH = 56;
      var PIN_HEIGHT = 75;

      divMapMark.className = 'pin';
      divMapMark.setAttribute('style', 'left: ' + (rentedAccommodation.location.x - PIN_WIDTH / 2) +
        'px; top: ' + (rentedAccommodation.location.y - PIN_HEIGHT) + 'px');
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
