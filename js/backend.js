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
  const EXIT_BUTTON = `Escape`;
  const main = document.querySelector(`main`);
  const type = {
    SUCCESS: `success`,
    ERROR: `error`
  };
  const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const successMessage = successMessageTemplate.cloneNode(true);
  const errorMessageTemplate = document.querySelector(`#error `).content.querySelector(`.error`);
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const closeSuccessButton = successMessage.querySelector(`.success__button`);
  const closeErrorButton = errorMessage.querySelector(`.error__button`);

  const loadError = (message) => {
    const errorWindow = document.createElement(`div`);
    errorWindow.classList.add(`error-window`);

    errorWindow.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, errorWindow);
  };

  const onCloseSuccessButtonClick = () => {
    successMessage.remove();
  };

  const onCloseErrorButtonClick = () => {
    errorMessage.remove();
  };

  const successUpload = () => {

    main.appendChild(successMessage);

    closeSuccessButton.addEventListener(`click`, onCloseSuccessButtonClick);

    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === EXIT_BUTTON) {
        onCloseSuccessButtonClick();
      }
    });

    document.addEventListener(`click`, (evt) => {
      if (evt.target.className === type.SUCCESS) {
        onCloseSuccessButtonClick();
      }
    });
  };

  const errorUpload = () => {

    main.appendChild(errorMessage);

    closeErrorButton.addEventListener(`click`, onCloseErrorButtonClick);

    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === EXIT_BUTTON) {
        onCloseErrorButtonClick();
      }
    });

    document.addEventListener(`click`, (evt) => {
      if (evt.target.className === type.ERROR) {
        onCloseSuccessButtonClick();
      }
    });
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
    loadError,
    successUpload,
    errorUpload
  };

})();
