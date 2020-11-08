'use strict';

(function () {

  const MAX_SCALE = 100;
  const MIN_SCALE = 25;
  const SCALE_STEP = 25;
  const MAX_EFFECT_VALUE = 100;
  let numberScale = 100;
  const effectClass = `effects__preview--`;
  let chosenEffect = `none`;
  const effectLevel = {
    none: {
      type: `none`,
      min: ``,
      max: ``,
      units: ``
    },
    chrome: {
      type: `grayscale`,
      min: 0,
      max: 1,
      units: ``
    },
    sepia: {
      type: `sepia`,
      min: 0,
      max: 1,
      units: ``
    },
    marvin: {
      type: `invert`,
      min: 0,
      max: 100,
      units: `%`
    },
    phobos: {
      type: `blur`,
      min: 0,
      max: 3,
      units: `px`
    },
    heat: {
      type: `brightness`,
      min: 1,
      max: 3,
      units: ``
    }
  };
  const scaleValue = document.querySelector(`.scale__control--value`);
  const scaleSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleBigger = document.querySelector(`.scale__control--bigger`);
  const imagePreview = document.querySelector(`.img-upload__preview`);
  const effects = document.querySelector(`.effects`);
  const effectLevelContainer = document.querySelector(`.effect-level`);
  const effectPin = document.querySelector(`.effect-level__pin`);
  const effectValue = document.querySelector(`.effect-level__value`);

  // Создана для изменения numberScale при закрытии формы в form.js, иначе изменения не передаются

  const setNumberScale = function (value) {
    numberScale = value;
  };

  // Смена стилей

  const effectsChangeHandler = function (evt) {
    imagePreview.children[0].classList.remove(chosenEffectClass);
    chosenEffect = evt.target.value;
    chosenEffectClass = effectClass + chosenEffect;
    imagePreview.children[0].classList.add(chosenEffectClass);
    if (evt.target.value !== `none`) {
      effectLevelContainer.classList.remove(`hidden`);
    } else if (!effectLevelContainer.classList.contains(`hidden`)) {
      effectLevelContainer.classList.add(`hidden`);
    }
    effectValue.value = MAX_EFFECT_VALUE;
    if (evt.target.value === `none`) {
      imagePreview.children[0].style.filter = evt.target.value;
    } else {
      imagePreview.children[0].style.filter = `${effectLevel[chosenEffect].type}(${effectLevel[chosenEffect].max}${effectLevel[chosenEffect].units})`;
    }
  };

  // Настройка эффекта от ползунка

  const onEffectPinMouseUp = function () {
    let rangeValue = Math.abs(effectLevel[chosenEffect].max * effectValue.value / 100 - effectLevel[chosenEffect].min) + effectLevel[chosenEffect].min;
    imagePreview.children[0].style.filter = `${effectLevel[chosenEffect].type}(${rangeValue}${effectLevel[chosenEffect].units})`;
  };

  // Изменение масштаба

  scaleBigger.addEventListener(`click`, function () {
    if (numberScale < MAX_SCALE) {
      numberScale = numberScale + SCALE_STEP;
      scaleValue.value = numberScale + `%`;
      imagePreview.style = `transform: scale(${(numberScale * 0.01)})`;
    }
  });

  scaleSmaller.addEventListener(`click`, function () {
    if (numberScale > MIN_SCALE) {
      numberScale = numberScale - SCALE_STEP;
      scaleValue.value = numberScale + `%`;
      imagePreview.style = `transform: scale(${(numberScale * 0.01)})`;
    }
  });

  // Наложение эффекта

  let chosenEffectClass = effectClass + chosenEffect;
  effectLevelContainer.classList.add(`hidden`);
  imagePreview.children[0].classList.add(chosenEffectClass);
  effects.addEventListener(`change`, effectsChangeHandler);

  // Отпускание ползунка

  effectPin.addEventListener(`mouseup`, onEffectPinMouseUp);

  window.editPhoto = {
    maxScale: MAX_SCALE,
    maxEffectValue: MAX_EFFECT_VALUE,
    setNumberScale: setNumberScale,
    numberScale: numberScale,
    effectClass: effectClass,
    chosenEffect: chosenEffect,
    scaleValue: scaleValue,
    imagePreview: imagePreview,
    effectLevelContainer: effectLevelContainer,
    effectValue: effectValue
  };

})();
