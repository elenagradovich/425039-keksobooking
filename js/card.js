'use strict';

(function () {
  var appartmentTemplate = document.querySelector('#lodge-template').content;
  var offerDialog = document.querySelector('.dialog');
  var dialogTitle = offerDialog.querySelector('.dialog__title');
  var appartmentObject;

  function determineOfferType(type) {
    if (type === 'flat') {
      return 'Квартира';
    } else if (type === 'bungalo') {
      return 'Бунгало';
    } else {
      return 'Дом';
    }
  }

  function generateDialogOffer(rentedAccommodation) {
    var offerObject = appartmentTemplate.cloneNode(true);
    var offerFeatures = offerObject.querySelector('.lodge__features');
    offerObject.querySelector('.lodge__title').textContent = rentedAccommodation.offer.title;
    offerObject.querySelector('.lodge__address').textContent = rentedAccommodation.offer.address;
    offerObject.querySelector('.lodge__price').innerHTML = rentedAccommodation.offer.price + '&#x20bd;/ночь';
    offerObject.querySelector('.lodge__type').textContent = determineOfferType(rentedAccommodation.offer.type);
    offerObject.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + rentedAccommodation.offer.guests +
      ' гостей в ' + rentedAccommodation.offer.rooms + ' комнатах';
    offerObject.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + rentedAccommodation.offer.checkin +
      ', выезд до ' + rentedAccommodation.offer.checkout;
    for (var i = 0; i < rentedAccommodation.offer.features.length; i++) {
      offerFeatures.insertAdjacentHTML('beforeend', '<span class="feature__image feature__image--' +
        rentedAccommodation.offer.features[i] + '"></span>');
    }
    offerObject.querySelector('.lodge__description').textContent = rentedAccommodation.offer.description;
    dialogTitle.children[0].setAttribute('src', rentedAccommodation.author.avatar);
    return offerObject;
  }

  window.card = {
    showDialogPanel: function (number) {
      appartmentObject = generateDialogOffer(window.cachedRentedAccommodations[number]);
      offerDialog.replaceChild(appartmentObject, offerDialog.querySelector('.dialog__panel'));
    },

    closeDialogPanel: function () {
      offerDialog.classList.add('hidden');
      window.pin.removePinActiveClass();
    }
  };
})();
