'use strict';

(function () {
  window.pinCurentAd = document.querySelector('.pin__main');
  var clickedPin = null;
  window.pin = {
    activePin: document.getElementsByClassName('pin--active'),
    PIN_WIDTH: Math.round(parseInt(window.getComputedStyle(window.pinCurentAd).width, 10) / 2),
    PIN_HEIGHT: parseInt(window.getComputedStyle(window.pinCurentAd).height, 10),
    getMapMarks: function (rentedAccommodation) {
      var divMapMark = document.createElement('div');
      divMapMark.className = 'pin';
      divMapMark.setAttribute('style', 'left: ' + (rentedAccommodation.location.x - window.pin.PIN_WIDTH) +
        'px; top: ' + (rentedAccommodation.location.y - window.pin.PIN_HEIGHT) + 'px');
      divMapMark.insertAdjacentHTML('afterbegin', '<img src="' + rentedAccommodation.author.avatar +
        '" title="' + rentedAccommodation.offer.title + '" class="rounded" width="40" height="40">');
      divMapMark.setAttribute('tabindex', 0);
      return divMapMark;
    },

    clickPinHandler: function (evt) {
      var hiddenDialog = document.getElementById('offer-dialog');

      if (hiddenDialog.classList.contains('hidden')) {
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
      if (window.pin.activePin.length > 0) {
        window.pin.activePin[0].classList.remove('pin--active');
      }
    }
  };
})();
