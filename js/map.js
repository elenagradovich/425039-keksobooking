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
    avatar: 'img/avatars/user0' + index + '.png'
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
for (var i = 1; i < 9; i++) {
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

function generateAppartmentObject(rentedAccommodation) {
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
  appartmentObject = generateAppartmentObject(rentedAccommodations[number]);
  offerDialog.replaceChild(appartmentObject, offerDialog.querySelector('.dialog__panel'));
}

showDialogPanel(0);

var pins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var clickedPin = null;
var dialogClose = dialog.querySelector('.dialog__close');

var clickPinHeandler = function (evt) {
  if (clickedPin) {
    clickedPin.classList.remove('pin--active');
  }
  clickedPin = evt.currentTarget;
  clickedPin.classList.add('pin--active');
  var index = clickedPin.getAttribute('data');
  showDialogPanel(index);
};

for (i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', clickPinHeandler);
  pins[i].setAttribute('data', i);
}

var closeDialogPanel = function () {
  dialog.classList.add('hidden');
};


dialogClose.addEventListener('click', function () {
  closeDialogPanel();
});
