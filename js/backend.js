'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.timeout = 10000;
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + 'с');
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка');
    });
    return xhr;
  };
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('get', SERVER_URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('post', SERVER_URL);
      xhr.send(data);
    }
  };
})();
