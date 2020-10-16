'use strict';

let COUNT = 25;
let posts = [];
let commentToPost = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
let userName = [`Артем`, `Наташа`, `Богдан`, `Аня`, `Марина`, `Сергей`];
let postTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
let picturesBlock = document.querySelector(`.pictures`);

let getRandomInt = function (min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

let shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

let getCommentsArray = function () {
  let length = getRandomInt(1, 6);
  let array = [];
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

let generatePosts = function (count) {
  let array = [];
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

let createPosts = function (array) {
  let postList = [];

  for (let i = 0; i < array.length; i++) {
    let postElement = postTemplate.cloneNode(true);
    let photo = postElement.querySelector(`.picture__img`);
    let likes = postElement.querySelector(`.picture__likes`);
    let comments = postElement.querySelector(`.picture__comments`);

    photo.src = array[i].url;
    likes.textContent = array[i].likes;
    comments.textContent = array[i].comments.length;

    postList.push(postElement);
  }

  return postList;
};

let renderPosts = function (postList, destinationBlock) {
  let postFragment = document.createDocumentFragment();

  for (let i = 0; i < postList.length; i++) {
    postFragment.appendChild(postList[i]);
  }

  destinationBlock.appendChild(postFragment);
};

posts = generatePosts(COUNT);

renderPosts(createPosts(posts), picturesBlock);
