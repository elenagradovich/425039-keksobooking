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

  entryFieldTimein.addEventListener('click', function () {
    if (entryFieldTimein.value === '12:00') {
      entryFieldTimeout.value = '12:00';
    } else if (entryFieldTimein.value === '13:00') {
      entryFieldTimeout.value = '13:00';
    } else if (entryFieldTimein.value === '14:00') {
      entryFieldTimeout.value = '14:00';
    }
  });

  entryFieldTimeout.addEventListener('click', function () {
    if (entryFieldTimeout.value === '12:00') {
      entryFieldTimein.value = '12:00';
    } else if (entryFieldTimeout.value === '13:00') {
      entryFieldTimein.value = '13:00';
    } else if (entryFieldTimeout.value === '14:00') {
      entryFieldTimein.value = '14:00';
    }
  });

  entryFieldType.addEventListener('click', function () {
    if (entryFieldType.value === 'bungalo') {
      entryFieldPrice.min = '0';
      entryFieldPrice.value = entryFieldPrice.min;
    } else if (entryFieldType.value === 'flat') {
      entryFieldPrice.min = '1000';
      entryFieldPrice.value = entryFieldPrice.min;
    } else if (entryFieldType.value === 'house') {
      entryFieldPrice.min = '5000';
      entryFieldPrice.value = entryFieldPrice.min;
    } else if (entryFieldType.value === 'palace') {
      entryFieldPrice.min = '10000';
      entryFieldPrice.value = entryFieldPrice.min;
    }
  });

  entryFieldType.addEventListener('click', function () {
    if (entryFieldType.value === 'bungalo') {
      entryFieldPrice.min = '0';
      entryFieldPrice.value = entryFieldPrice.min;
    } else if (entryFieldType.value === 'flat') {
      entryFieldPrice.min = '1000';
      entryFieldPrice.value = entryFieldPrice.min;
    } else if (entryFieldType.value === 'house') {
      entryFieldPrice.min = '5000';
      entryFieldPrice.value = entryFieldPrice.min;
    } else if (entryFieldType.value === 'palace') {
      entryFieldPrice.min = '10000';
      entryFieldPrice.value = entryFieldPrice.min;
    }
  });

  function resetClassHidden(number) {
    for (var i = 0; i < entryFieldCapacity.length; i++) {
      entryFieldCapacity.children[i].removeAttribute('selected');
      entryFieldCapacity.children[i].classList.remove('hidden');
    }
    entryFieldCapacity.children[number].setAttribute('selected', true);
  }

  entryFieldRoomNumber.addEventListener('click', function () {
    if (entryFieldRoomNumber.value === '1') {
      resetClassHidden(2);
      entryFieldCapacity.children[0].classList.add('hidden');
      entryFieldCapacity.children[1].classList.add('hidden');
      entryFieldCapacity.children[3].classList.add('hidden');
    } else if (entryFieldRoomNumber.value === '2') {
      resetClassHidden(1);
      entryFieldCapacity.children[0].classList.add('hidden');
      entryFieldCapacity.children[3].classList.add('hidden');
    } else if (entryFieldRoomNumber.value === '3') {
      resetClassHidden(0);
      entryFieldCapacity.children[3].classList.add('hidden');
    } else if (entryFieldRoomNumber.value === '100') {
      resetClassHidden(3);
      entryFieldCapacity.children[0].classList.add('hidden');
      entryFieldCapacity.children[1].classList.add('hidden');
      entryFieldCapacity.children[2].classList.add('hidden');
    }
  });

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
