'use strict';

var titleDate = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var typeDate = ['flat', 'house', 'bungalo'];
var checkinDate = ['12:00', '13:00', '14:00'];
var checkoutDate = ['12:00', '13:00', '14:00'];
var featuresDate = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRandomArrayValue(array) {
  var indexName = Math.floor(Math.random() * array.length);
  return array[indexName];
}
function createApartmentObject(index) {
  var apartmentObject = {};
  apartmentObject.author = {
    avatar: 'img/avatars/user0' + (index + 1) + '.png'
  };
  var positionX = getRandomValue(300, 900);
  var positionY = getRandomValue(100, 500);
  var apartmentRooms = getRandomValue(1, 5);
  apartmentObject.offer = {
    title: titleDate[index],
    address: positionX + ' . ' + positionY,
    price: getRandomValue(1000, 1000000),
    type: getRandomArrayValue(typeDate),
    rooms: apartmentRooms,
    guests: getRandomValue(1, apartmentRooms),
    checkin: getRandomArrayValue(checkinDate),
    checkout: getRandomArrayValue(checkoutDate),
    features: featuresDate,
    description: '',
    photos: []
  };
  apartmentObject.location = {
    x: positionX,
    y: positionY
  };
  return apartmentObject;
}

var rentedAccommodations = [];
for (var i = 0; i < 8; i++) {
  rentedAccommodations.push(createApartmentObject(i));
}

function getMapMarks(rentedAccommodation) {
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
}

var mapMarks = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();

for (var j = 0; j < 8; j++) {
  fragment.appendChild(getMapMarks(rentedAccommodations[j]));
}
mapMarks.appendChild(fragment);

var appartmentTemplate = document.querySelector('#lodge-template').content;
var offerDialog = document.querySelector('.dialog');
var dialogTitle = offerDialog.querySelector('.dialog__title');


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
  for (i = 0; i < featuresDate.length; i++) {
    offerFeatures.insertAdjacentHTML('beforeend', '<span class="feature__image feature__image--' +
      rentedAccommodation.offer.features[i] + '"></span>');
  }
  offerObject.querySelector('.lodge__description').textContent = rentedAccommodation.offer.description;
  dialogTitle.children[0].setAttribute('src', rentedAccommodation.author.avatar);
  return offerObject;
}

var appartmentObject;

function showDialogPanel(number) {
  appartmentObject = generateDialogOffer(rentedAccommodations[number]);
  offerDialog.replaceChild(appartmentObject, offerDialog.querySelector('.dialog__panel'));
}

showDialogPanel(0);

var pins = document.querySelectorAll('.pin');
var clickedPin = null;
var dialogClose = offerDialog.querySelector('.dialog__close');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var clickPinHeandler = function (evt) {
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
  showDialogPanel(index - 1);
};

for (i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', clickPinHeandler);
  pins[i].setAttribute('data', i);
  pins[i].addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      clickPinHeandler(evt);
    }
  });
}
var activePin = document.getElementsByClassName('pin--active');
function removePinActiveClass() {
  activePin[0].classList.remove('pin--active');
}

function closeDialogPanel() {
  removePinActiveClass();
  offerDialog.classList.add('hidden');
}

dialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeDialogPanel();
  }
});

dialogClose.addEventListener('click', function () {
  closeDialogPanel();
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE && activePin) {
    closeDialogPanel();
  }
});

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
  for (i = 0; i < entryFieldCapacity.length; i++) {
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
