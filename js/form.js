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
        element.children[i].classList.remove('hidden');
      } else if (value1 === '100' && element.children[i].value === '0') {
        element.children[i].setAttribute('selected', true);
        element.children[i].classList.remove('hidden');
      } else {
        element.children[i].removeAttribute('selected');
        element.children[i].classList.add('hidden');
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
  var inputTitleHeandler = function () {
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

  var inputAddressHeandler = function () {
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


  inputTitle.addEventListener('invalid', inputTitleHeandler);
  inputTitle.addEventListener('input', inputTitleHeandler);

  inputAddress.addEventListener('invalid', inputAddressHeandler);
  inputAddress.addEventListener('input', inputAddressHeandler);

  var loadDataHeandler = function (data) {
    window.cachedRentedAccommodations = [];
    for (var i = 0; i < data.length; i++) {
      window.cachedRentedAccommodations.push(data[i]);
    }
    window.map.renderFragment(window.cachedRentedAccommodations);
    window.showDialog.showCard();
    window.card.showDialogPanel(0);
  };

  var saveDataHeandler = function () {
    formNotice.reset();
  };
  var errorHeandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(loadDataHeandler, errorHeandler);

  formNotice.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formNotice), saveDataHeandler, errorHeandler);
  });
})();
