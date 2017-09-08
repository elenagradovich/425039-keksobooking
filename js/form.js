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

  var syncRoomsOpacity = function (value1, element) {

    function resetClassHidden(number) {
      for (var i = 0; i < entryFieldCapacity.length; i++) {
        entryFieldCapacity.children[i].removeAttribute('selected');
        entryFieldCapacity.children[i].classList.remove('hidden');
      }
      entryFieldCapacity.children[number].setAttribute('selected', true);
    }

    if (value1 === '1') {
      resetClassHidden(2);
      element.children[0].classList.add('hidden');
      element.children[1].classList.add('hidden');
      element.children[3].classList.add('hidden');
    } else if (value1 === '2') {
      resetClassHidden(1);
      element.children[0].classList.add('hidden');
      element.children[3].classList.add('hidden');
    } else if (value1 === '3') {
      resetClassHidden(0);
      element.children[3].classList.add('hidden');
    } else if (value1 === '100') {
      resetClassHidden(3);
      element.children[0].classList.add('hidden');
      element.children[1].classList.add('hidden');
      element.children[2].classList.add('hidden');
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

  entryFieldRoomNumber.addEventListener('change', function () {
    window.synchronizeFields(entryFieldRoomNumber, entryFieldCapacity,
        syncRoomsOpacity);
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
