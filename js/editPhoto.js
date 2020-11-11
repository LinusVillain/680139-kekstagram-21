'use strict';

(function () {

  const MAX_SCALE = 100;
  const MIN_SCALE = 25;
  const SCALE_STEP = 25;
  const MAX_EFFECT_VALUE = 100;
  const NO_EFFECT = `none`;
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
  const effectPin = effectLevelContainer.querySelector(`.effect-level__pin`);
  const effectValue = effectLevelContainer.querySelector(`.effect-level__value`);
  const effectDepth = document.querySelector(`.effect-level__depth`);

  // Смена стилей

  const effectsChangeHandler = (evt) => {
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

    imagePreview.children[0].style.filter = (evt.target.value === NO_EFFECT) ? evt.target.value : `${effectLevel[chosenEffect].type}(${effectLevel[chosenEffect].max}${effectLevel[chosenEffect].units})`;
    effectPin.style.left = `100%`;
    effectDepth.style.width = `100%`;
  };

  // Изменение масштаба

  const transformImage = (size) => {
    scaleValue.value = `${size}%`;
    imagePreview.style = `transform: scale(${(size * 0.01)})`;
  };

  scaleBigger.addEventListener(`click`, () => {
    let numberScale = parseInt(scaleValue.value, 10);

    if (numberScale < MAX_SCALE) {
      numberScale = numberScale + SCALE_STEP;
      transformImage(numberScale);
    }
  });

  scaleSmaller.addEventListener(`click`, () => {
    let numberScale = parseInt(scaleValue.value, 10);

    if (numberScale > MIN_SCALE) {
      numberScale = numberScale - SCALE_STEP;
      transformImage(numberScale);
    }
  });

  // Движение ползунка

  effectPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = evt.clientX;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = startCoords - moveEvt.clientX;
      const pinMaxPose = effectPin.parentElement.offsetWidth;
      const newPinPos = effectPin.offsetLeft - shift;
      if (newPinPos >= 0 && newPinPos <= pinMaxPose) {

        effectPin.style.left = `${newPinPos}px`;

        effectValue.value = Math.round(effectPin.offsetLeft / pinMaxPose * 100);

        effectDepth.style.width = `${effectValue.value}%`;

        let rangeValue = (effectLevel[chosenEffect].max - effectLevel[chosenEffect].min) / 100 * effectValue.value + effectLevel[chosenEffect].min;
        imagePreview.children[0].style.filter = `${effectLevel[chosenEffect].type}(${rangeValue}${effectLevel[chosenEffect].units})`;

        startCoords = moveEvt.clientX;

      }
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  // Наложение эффекта
  let chosenEffectClass = effectClass + chosenEffect;

  effectLevelContainer.classList.add(`hidden`);
  imagePreview.children[0].classList.add(chosenEffectClass);

  effects.addEventListener(`change`, effectsChangeHandler);

  window.editPhoto = {
    MAX_SCALE,
    MAX_EFFECT_VALUE,
    NO_EFFECT,
    effects,
    effectClass,
    chosenEffect,
    scaleValue,
    imagePreview,
    effectLevelContainer,
    effectValue,
    transformImage
  };

})();
