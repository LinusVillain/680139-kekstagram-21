'use strict';

(function () {

  const EXIT_BUTTON = `Escape`;
  const MAX_HACHTAGS = 5;
  const MAX_SYMBOLS_IN_COMMENT = 140;
  const HASTAG_REGEX = RegExp(`^#[a-zA-Z0-9а-яА-Я]{1,19}$`);
  const uploadInput = document.querySelector(`#upload-file`);
  const uploadForm = document.querySelector(`.img-upload__overlay`);
  const closeButton = uploadForm.querySelector(`#upload-cancel`);
  const hashtagsInput = uploadForm.querySelector(`.text__hashtags`);
  const commentInput = uploadForm.querySelector(`.text__description`);

  // Закрытие формы и сброс настроек

  const closeForm = () => {
    uploadForm.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    uploadInput.value = ``;

    window.editPhoto.transformImage(window.editPhoto.MAX_SCALE);

    window.editPhoto.imagePreview.children[0].classList.remove(window.editPhoto.chosenEffectClass);
    window.editPhoto.chosenEffect = window.editPhoto.NO_EFFECT;
    window.editPhoto.chosenEffectClass = window.editPhoto.effectClass + window.editPhoto.chosenEffect;
    window.editPhoto.imagePreview.children[0].classList.add(window.editPhoto.chosenEffectClass);

    if (!window.editPhoto.effectLevelContainer.classList.contains(`hidden`)) {
      window.editPhoto.effectLevelContainer.classList.add(`hidden`);
    }

    window.editPhoto.effectValue.value = window.editPhoto.MAX_EFFECT_VALUE;
    window.editPhoto.imagePreview.children[0].style = `filter: ${window.editPhoto.NO_EFFECT}`;

    hashtagsInput.value = ``;
    hashtagsInput.setCustomValidity(``);
    commentInput.value = ``;
    commentInput.setCustomValidity(``);
    document.getElementById(`effect-none`).checked = true;
  };

  // Функция валидации хэштегов и комментария

  const onHashtagsInput = () => {
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

  const onCommentInput = () => {
    if (commentInput.value.length > MAX_SYMBOLS_IN_COMMENT) {
      commentInput.setCustomValidity(`Длина комментария не может составлять больше 140 символов.`);
    } else {
      commentInput.setCustomValidity(``);
    }
  };

  // Открытие и закрытие формы

  uploadInput.addEventListener(`change`, () => {

    uploadForm.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);

    closeButton.addEventListener(`click`, () => {
      closeForm();
    });

    document.addEventListener(`keydown`, (evt) => {
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
