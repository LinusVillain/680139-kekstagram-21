'use strict';

(function () {
  const URL_LOAD = `https://21.javascript.pages.academy/kekstagram/data`;
  const URL_UPLOAD = `https://21.javascript.pages.academy/kekstagram`;

  const StatusCode = {
    OK: 200
  };

  const requestType = {
    POST: `POST`,
    GET: `GET`
  };

  const TIMEOUT_IN_MS = 10000;

  const loadError = (errorMessage) => {
    const errorWindow = document.createElement(`div`);
    errorWindow.classList.add(`error-window`);

    errorWindow.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errorWindow);
  };

  const request = function (onSuccess, onError, data) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    if (data) {
      xhr.open(requestType.POST, URL_UPLOAD);
      xhr.send(data);
    } else {
      xhr.open(requestType.GET, URL_LOAD);
      xhr.send();
    }

  };

  window.backend = {
    load: request,
    save: request,
    loadError
  };

})();
