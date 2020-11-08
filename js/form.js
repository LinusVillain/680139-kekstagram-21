'use strict';

(function () {

  const EXIT_BUTTON = `Escape`;
  const MAX_HACHTAGS = 5;
  const MAX_SYMBOLS_IN_COMMENT = 140;
  const HASTAG_REGEX = RegExp(`^#[a-zA-Z0-9а-яА-Я]{1,19}$`);
  const uploadInput = document.querySelector(`#upload-file`);
  const uploadForm = document.querySelector(`.img-upload__overlay`);
  const closeButton = document.querySelector(`#upload-cancel`);
  const hashtagsInput = document.querySelector(`.text__hashtags`);
  const commentInput = document.querySelector(`.text__description`);

  // Закрытие формы и сброс настроек

  const closeForm = function () {
    uploadForm.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    uploadInput.value = ``;
    window.editPhoto.imagePreview.style = `transform: scale(1)`;
    window.editPhoto.setNumberScale(window.editPhoto.maxScale);
    window.editPhoto.imagePreview.children[0].classList.remove(window.editPhoto.chosenEffectClass);
    window.editPhoto.chosenEffect = `none`;
    window.editPhoto.chosenEffectClass = window.editPhoto.effectClass + window.editPhoto.chosenEffect;
    window.editPhoto.imagePreview.children[0].classList.add(window.editPhoto.chosenEffectClass);
    if (!window.editPhoto.effectLevelContainer.classList.contains(`hidden`)) {
      window.editPhoto.effectLevelContainer.classList.add(`hidden`);
    }
    window.editPhoto.effectValue.value = window.editPhoto.maxEffectValue;
    window.editPhoto.imagePreview.children[0].style = `filter: none`;
    hashtagsInput.setCustomValidity(``);
  };

  // Функция валидации хэштегов и комментария

  const onHashtagsInput = function () {
    let hashtags = hashtagsInput.value.split(` `);

    if (hashtags.length === 1 && hashtags[0] === ``) {
      hashtagsInput.setCustomValidity(``);
    } else {
      hashtags.forEach(function (hashtag) {
        if (!HASTAG_REGEX.test(hashtag)) {
          hashtagsInput.setCustomValidity(`Не удовлетворяет условиям:
          1. хэш-тег начинается с символа # (решётка);
          2. строка после решётки должна состоять из букв и чисел;
          3. хеш-тег не может состоять только из одной решётки;
          4. максимальная длина одного хэш-тега 20 символов, включая решётку;
          5. хэш-теги разделяются пробелами.`);
        } else {
          hashtagsInput.setCustomValidity(``);
        }
      });

      if (hashtags.length > MAX_HACHTAGS) {
        hashtagsInput.setCustomValidity(`Нельзя указать больше пяти хэш-тегов.`);
      }

      let copyHashtags = hashtags.slice().sort();
      for (let i = 0; i < copyHashtags.length - 1; i++) {
        if (copyHashtags[i + 1].toLowerCase() === copyHashtags[i].toLowerCase()) {
          hashtagsInput.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды.`);
        }
      }
    }
  };

  const onCommentInput = function () {
    if (commentInput.value.length > MAX_SYMBOLS_IN_COMMENT) {
      commentInput.setCustomValidity(`Длина комментария не может составлять больше 140 символов.`);
    } else {
      commentInput.setCustomValidity(``);
    }
  };

  // Открытие и закрытие формы

  uploadInput.addEventListener(`change`, function () {

    uploadForm.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);

    window.editPhoto.scaleValue.value = window.editPhoto.numberScale + `%`;

    closeButton.addEventListener(`click`, function () {
      closeForm();
    });

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === EXIT_BUTTON) {
        if (hashtagsInput !== document.activeElement && commentInput !== document.activeElement) {
          closeForm();
        }
      }
    });

  });

  // Валидация хэштегов

  hashtagsInput.addEventListener(`input`, onHashtagsInput);
  commentInput.addEventListener(`input`, onCommentInput);

})();
