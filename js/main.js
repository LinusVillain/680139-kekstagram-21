'use strict';

const COUNT = 25;
let posts = [];
const commentToPost = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
const userName = [`Артем`, `Наташа`, `Богдан`, `Аня`, `Марина`, `Сергей`];
const postTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
const picturesBlock = document.querySelector(`.pictures`);

const getRandomInt = function (min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

const getCommentsArray = function () {
  const length = getRandomInt(1, 6);
  const array = [];
  for (let i = 0; i < length; i++) {
    array.push(
        {
          avatar: `img/avatar-` + (getRandomInt(1, 6)) + `.svg`,
          message: shuffleArray(commentToPost)[1],
          name: shuffleArray(userName)[1]
        }
    );
  }
  return array;
};

const generatePosts = function (count) {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(
        {
          url: `photos/` + (i + 1) + `.jpg`,
          description: `Тут очень крутое фото`,
          likes: getRandomInt(15, 200),
          comments: getCommentsArray()
        }
    );
  }
  return array;
};

const createPosts = function (array) {
  const postList = [];

  for (let i = 0; i < array.length; i++) {
    const postElement = postTemplate.cloneNode(true);
    const photo = postElement.querySelector(`.picture__img`);
    const likes = postElement.querySelector(`.picture__likes`);
    const comments = postElement.querySelector(`.picture__comments`);

    photo.src = array[i].url;
    likes.textContent = array[i].likes;
    comments.textContent = array[i].comments.length;

    postList.push(postElement);
  }

  return postList;
};

const render = function (elementList, destinationBlock) {
  const postFragment = document.createDocumentFragment();

  for (let i = 0; i < elementList.length; i++) {
    postFragment.appendChild(elementList[i]);
  }

  destinationBlock.appendChild(postFragment);
};

posts = generatePosts(COUNT);

render(createPosts(posts), picturesBlock);


// Задание 3.2.

const postBlock = document.querySelector(`.big-picture`);
const postImage = document.querySelector(`.big-picture__img`);
const likes = document.querySelector(`.likes-count`);
const comments = document.querySelector(`.comments-count`);
const description = document.querySelector(`.social__caption`);
const commentsBlock = document.querySelector(`.social__comments`);
const commentsArray = document.querySelectorAll(`.social__comment`);
const counterOfComments = document.querySelector(`.social__comment-count`);
const counterOfLoadedComments = document.querySelector(`.comments-loader`);

const deleteComments = function (listOfComments, commentWrapper) {
  for (let i = 0; i < listOfComments.length; i++) {
    commentWrapper.removeChild(listOfComments[i]);
  }
};

const createComments = function (post) {
  const commentsOfPost = [];

  for (let i = 0; i < post.comments.length; i++) {
    const newComment = document.createElement(`li`);
    newComment.classList.add(`social__comment`);
    const userPicture = document.createElement(`img`);
    userPicture.classList.add(`social__picture`);
    userPicture.src = post.comments[i].avatar;
    userPicture.alt = post.comments[i].name;
    userPicture.width = `35`;
    userPicture.height = `35`;
    newComment.append(userPicture);
    const commentText = document.createElement(`p`);
    commentText.classList.add(`social__text`);
    commentText.textContent = post.comments[i].message;
    newComment.append(commentText);
    commentsOfPost.push(newComment);
  }
  return commentsOfPost;
};

// postBlock.classList.remove(`hidden`); для работы с заданием 4.1.

postImage.children[0].src = posts[0].url;
likes.textContent = posts[0].likes;
comments.textContent = posts[0].comments.length;
description.textContent = posts[0].description;

deleteComments(commentsArray, commentsBlock);

render(createComments(posts[0]), commentsBlock);

counterOfComments.classList.add(`hidden`);
counterOfLoadedComments.classList.add(`hidden`);

// document.body.classList.add(`modal-open`); для работы с заданием 4.1.


// Задание 4.1.

const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
let numberScale = 100;
const MAX_HACHTAGS = 5;
const HASTAG_REGEX = RegExp(`^#[a-zA-Z0-9а-яА-Я]{1,19}$`);
const effectClass = `effects__preview--`;
let chosenEffect = `none`;
const effectLevel = {
  chrome: {
    min: 0,
    max: 1
  },
  sepia: {
    min: 0,
    max: 1
  },
  marvin: {
    min: 0,
    max: 100
  },
  phobos: {
    min: 0,
    max: 3
  },
  heat: {
    min: 1,
    max: 3
  }
};
const uploadInput = document.querySelector(`#upload-file`);
const uploadForm = document.querySelector(`.img-upload__overlay`);
const closeButton = document.querySelector(`#upload-cancel`);
const scaleValue = document.querySelector(`.scale__control--value`);
const scaleSmaller = document.querySelector(`.scale__control--smaller`);
const scaleBigger = document.querySelector(`.scale__control--bigger`);
const imagePreview = document.querySelector(`.img-upload__preview`);
const effects = document.querySelector(`.effects`);
const effectLevelContainer = document.querySelector(`.effect-level`);
const effectPin = document.querySelector(`.effect-level__pin`);
const effectValue = document.querySelector(`.effect-level__value`);
const hashtagsInput = document.querySelector(`.text__hashtags`);
const commentInput = document.querySelector(`.text__description`);


// Закрытие формы и сброс настроек

const closeForm = function () {
  uploadForm.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);
  uploadInput.value = ``;
  imagePreview.style = `transform: scale(1)`;
  numberScale = 100;
  imagePreview.children[0].classList.remove(chosenEffectClass);
  chosenEffect = `none`;
  chosenEffectClass = effectClass + chosenEffect;
  imagePreview.children[0].classList.add(chosenEffectClass);
  if (!effectLevelContainer.classList.contains(`hidden`)) {
    effectLevelContainer.classList.add(`hidden`);
  }
  effectValue.value = 100;
  imagePreview.children[0].style = `filter: none`;
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
  effectValue.value = 100;
  if (chosenEffect === `none`) {
    imagePreview.children[0].style = `filter: none`;
  }
  if (chosenEffect === `chrome`) {
    imagePreview.children[0].style = `filter: grayscale(1)`;
  }
  if (chosenEffect === `sepia`) {
    imagePreview.children[0].style = `filter: sepia(1)`;
  }
  if (chosenEffect === `marvin`) {
    imagePreview.children[0].style = `filter: invert(100%)`;
  }
  if (chosenEffect === `phobos`) {
    imagePreview.children[0].style = `filter: blur(3px)`;
  }
  if (chosenEffect === `heat`) {
    imagePreview.children[0].style = `filter: brightness(3)`;
  }
};

// Настройка эффекта от ползунка

const onEffectPinMouseUp = function () {
  let rangeValue = Math.abs(effectLevel[chosenEffect].max * effectValue.value / 100 - effectLevel[chosenEffect].min) + effectLevel[chosenEffect].min;
  if (chosenEffect === `chrome`) {
    imagePreview.children[0].style = `filter: grayscale(` + rangeValue + `)`;
  }
  if (chosenEffect === `sepia`) {
    imagePreview.children[0].style = `filter: sepia(` + rangeValue + `)`;
  }
  if (chosenEffect === `marvin`) {
    imagePreview.children[0].style = `filter: invert(` + rangeValue + `%)`;
  }
  if (chosenEffect === `phobos`) {
    imagePreview.children[0].style = `filter: blur(` + rangeValue + `px)`;
  }
  if (chosenEffect === `heat`) {
    imagePreview.children[0].style = `filter: brightness(` + rangeValue + `)`;
  }
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
  if (commentInput.value.length > 140) {
    commentInput.setCustomValidity(`Длина комментария не может составлять больше 140 символов.`);
  } else {
    commentInput.setCustomValidity(``);
  }
};

// Открытие и закрытие формы

uploadInput.addEventListener(`change`, function () {
  uploadForm.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);

  scaleValue.value = numberScale + `%`;

  closeButton.addEventListener(`click`, function () {
    closeForm();
  });

  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Escape`) {
      if (hashtagsInput !== document.activeElement && commentInput !== document.activeElement) {
        closeForm();
      }
    }
  });

});

// Изменение масштаба

scaleBigger.addEventListener(`click`, function () {
  if (numberScale < MAX_SCALE) {
    numberScale = numberScale + SCALE_STEP;
    scaleValue.value = numberScale + `%`;
    imagePreview.style = `transform: scale(` + (numberScale * 0.01) + `)`;
  }
});

scaleSmaller.addEventListener(`click`, function () {
  if (numberScale > MIN_SCALE) {
    numberScale = numberScale - SCALE_STEP;
    scaleValue.value = numberScale + `%`;
    imagePreview.style = `transform: scale(` + (numberScale * 0.01) + `)`;
  }
});


// Наложение эффекта

effectLevelContainer.classList.add(`hidden`);
let chosenEffectClass = effectClass + chosenEffect;
imagePreview.children[0].classList.add(chosenEffectClass);
effects.addEventListener(`change`, effectsChangeHandler);

// Отпускание ползунка

effectPin.addEventListener(`mouseup`, onEffectPinMouseUp);

// Валидация хэштегов

hashtagsInput.addEventListener(`input`, onHashtagsInput);
commentInput.addEventListener(`input`, onCommentInput);
