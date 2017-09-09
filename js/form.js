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

    var selectedValue = value1;
    var invisibleElements = [];

    switch (selectedValue) {
      case '1':
        invisibleElements = ['0', '2', '3'];
        break;
      case '2':
        invisibleElements = ['0', '3'];
        break;
      case '3':
        invisibleElements = ['0'];
        break;
      default:
        selectedValue = '0';
        invisibleElements = ['1', '2', '3'];
        break;
    }

    for (var i = 0; i < element.length; i++) {
      var child = element.children[i];
      if (child.value === selectedValue) {
        child.setAttribute('selected', true);
      } else {
        child.removeAttribute('selected');
      }

      if (invisibleElements.indexOf(child.value) >= 0) {
        child.classList.add('hidden');
      } else {
        child.classList.remove('hidden');
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
})();
