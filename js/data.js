/*

'use strict';
(function () {
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
  window.featuresDate = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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
      features: window.featuresDate,
      description: '',
      photos: []
    };
    apartmentObject.location = {
      x: positionX,
      y: positionY
    };
    return apartmentObject;
  }

  window.data = {
    rentedAccommodations: (function () {
      var rentedAccommodations = [];
      for (var i = 0; i < 8; i++) {
        rentedAccommodations.push(createApartmentObject(i));
      }
      return rentedAccommodations;
    })()
  };
})();
 */
