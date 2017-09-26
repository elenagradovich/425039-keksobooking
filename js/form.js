'use strict';
(function () {
  var entryFieldTimein = document.getElementById('timein');
  var entryFieldTimeout = document.getElementById('timeout');
  var entryFieldType = document.getElementById('type');
  var entryFieldPrice = document.getElementById('price');
  var entryFieldRoomNumber = document.getElementById('room_number');
  var entryFieldCapacity = document.getElementById('capacity');
  var inputTitle = document.getElementById('title');
  var inputAddress = document.getElementById('address');
  var formNotice = document.querySelector('.notice__form');

  var syncValues = function (value1, element) {
    element.value = value1;
  };

  var syncTypeMinPrice = function (value1, element) {
    if (value1 === 'bungalo') {
      element.value = element.min = '0';
    } else if (value1 === 'flat') {
      element.value = element.min = '1000';
    } else if (value1 === 'house') {
      element.value = element.min = '5000';
    } else if (value1 === 'palace') {
      element.value = element.min = '10000';
    }
  };

  var syncRoomsCapacity = function (value1, element) {
    for (var i = 0; i < element.length; i++) {
      if (value1 !== '100' && value1 >= element.children[i].value && element.children[i].value !== '0') {
        element.children[i].setAttribute('selected', true);
        element.children[i].removeAttribute('disabled');
      } else if (value1 === '100' && element.children[i].value === '0') {
        element.children[i].setAttribute('selected', true);
        element.children[i].removeAttribute('disabled');
      } else {
        element.children[i].removeAttribute('selected');
        element.children[i].setAttribute('disabled', true);
      }
    }
  };

  entryFieldTimein.addEventListener('change', function () {
    window.synchronizeFields(entryFieldTimein, entryFieldTimeout,
        syncValues);
  });

  entryFieldTimeout.addEventListener('change', function () {
    window.synchronizeFields(entryFieldTimeout, entryFieldTimein,
        syncValues);
  });

  entryFieldType.addEventListener('change', function () {
    window.synchronizeFields(entryFieldType, entryFieldPrice,
        syncTypeMinPrice);
  });

  document.addEventListener('DOMContentLoaded', function () {
    window.synchronizeFields(entryFieldRoomNumber, entryFieldCapacity,
        syncRoomsCapacity);
  });

  entryFieldRoomNumber.addEventListener('change', function () {
    window.synchronizeFields(entryFieldRoomNumber, entryFieldCapacity,
        syncRoomsCapacity);
  });

  // Валидация полей ввода
  var inputTitleHandler = function () {
    inputTitle.setCustomValidity('');
    if (!inputTitle.validity.valid) {
      inputTitle.setAttribute('style', 'border: 2px solid red');
      if (inputTitle.validity.tooShort) {
        inputTitle.setCustomValidity('Имя должно состоять минимум из 30 символов');
      } else if (inputTitle.validity.tooLong) {
        inputTitle.setCustomValidity('Имя не должно превышать 100 символов');
      } else if (inputTitle.validity.valueMissing) {
        inputTitle.setCustomValidity('Обязательное поле');
      }
    } else {
      inputTitle.setCustomValidity('');
      inputTitle.setAttribute('style', 'border: none');
    }
  };

  var inputAddressHandler = function () {
    inputAddress.setCustomValidity('');
    if (!inputAddress.validity.valid) {
      inputAddress.setAttribute('style', 'border: 2px solid red');
      if (inputAddress.validity.valueMissing) {
        inputAddress.setCustomValidity('Обязательное поле');
      }
    } else {
      inputAddress.setCustomValidity('');
      inputAddress.setAttribute('style', 'border: none');
    }
  };


  inputTitle.addEventListener('invalid', inputTitleHandler);
  inputTitle.addEventListener('input', inputTitleHandler);

  inputAddress.addEventListener('invalid', inputAddressHandler);
  inputAddress.addEventListener('input', inputAddressHandler);

  var loadDataHandler = function (data) {
    window.cachedRentedAccommodations = [];
    for (var i = 0; i < data.length; i++) {
      window.cachedRentedAccommodations.push(data[i]);
    }
    window.map.renderFragment(window.cachedRentedAccommodations);
    window.showDialog.showCard();
    window.card.showDialogPanel(0);
  };
  var saveDataHandler = function () {
    formNotice.reset();
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(loadDataHandler, errorHandler);

  formNotice.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formNotice), saveDataHandler, errorHandler);
  });

  //  Фильтрация форм
  var housingType = document.getElementById('housing_type');
  var housingPrice = document.getElementById('housing_price');
  var housingRoomNumber = document.getElementById('housing_room-number');
  var housingGuestsNumber = document.getElementById('housing_guests-number');
  var housingFeatures = document.getElementById('housing_features');
  var featureWifi = housingFeatures.querySelector('input[value="wifi"]');
  var featueDishwasher = housingFeatures.querySelector('input[value="dishwasher"]');
  var featueParking = housingFeatures.querySelector('input[value="parking"]');
  var featueWasher = housingFeatures.querySelector('input[value="washer"]');
  var featueElevator = housingFeatures.querySelector('input[value="elevator"]');
  var featueConditioner = housingFeatures.querySelector('input[value="conditioner"]');

  var renderFilteredData = function () {
    var pinsOnMap = document.querySelectorAll('.pin');
    for (var i = 0; i < pinsOnMap.length; i++) {
      if (!pinsOnMap[i].classList.contains('pin__main')) {
        window.mapMarks.removeChild(pinsOnMap[i]);
      }
    }
    var newPins = window.cachedRentedAccommodations.filter(function (it) {
      return (housingType.value === 'any' || it.offer.type === housingType.value) &&
        (housingPrice.value === 'any' ||
        housingPrice.value === 'middle' && (it.offer.price >= 10000 && it.offer.price <= 50000) ||
        housingPrice.value === 'low' && it.offer.price < 10000 ||
        housingPrice.value === 'high' && it.offer.price > 50000) &&
        (housingRoomNumber.value === 'any' || it.offer.rooms === +housingRoomNumber.value) &&
        (housingGuestsNumber.value === 'any' || it.offer.guests >= +housingGuestsNumber.value) &&
        (!featureWifi.checked || featureWifi.checked && it.offer.features.indexOf('wifi') >= 0) &&
        (!featueDishwasher.checked || featueDishwasher.checked && it.offer.features.indexOf('dishwasher') >= 0) &&
        (!featueParking.checked || featueParking.checked && it.offer.features.indexOf('parking') >= 0) &&
        (!featueWasher.checked || featueWasher.checked && it.offer.features.indexOf('washer') >= 0) &&
        (!featueElevator.checked || featueElevator.checked && it.offer.features.indexOf('elevator') >= 0) &&
        (!featueConditioner.checked || featueConditioner.checked && it.offer.features.indexOf('conditioner') >= 0);
    });
    window.map.renderFragment(newPins);
  };

  housingType.addEventListener('change', function () {
    renderFilteredData(housingType);
  });

  housingPrice.addEventListener('change', function () {
    renderFilteredData(housingPrice);
  });

  housingRoomNumber.addEventListener('change', function () {
    renderFilteredData(housingRoomNumber);
  });

  housingGuestsNumber.addEventListener('change', function () {
    renderFilteredData(housingGuestsNumber);
  });

  featureWifi.addEventListener('change', function () {
    renderFilteredData(featureWifi);
  });

  featueDishwasher.addEventListener('change', function () {
    renderFilteredData(featueDishwasher);
  });

  featueWasher.addEventListener('change', function () {
    renderFilteredData(featueWasher);
  });

  featueParking.addEventListener('change', function () {
    renderFilteredData(featueParking);
  });

  featueElevator.addEventListener('change', function () {
    renderFilteredData(featueElevator);
  });

  featueConditioner.addEventListener('change', function () {
    renderFilteredData(featueConditioner);
  });
})();
