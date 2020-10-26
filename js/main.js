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

postBlock.classList.remove(`hidden`);

postImage.children[0].src = posts[0].url;
likes.textContent = posts[0].likes;
comments.textContent = posts[0].comments.length;
description.textContent = posts[0].description;

deleteComments(commentsArray, commentsBlock);

render(createComments(posts[0]), commentsBlock);

counterOfComments.classList.add(`hidden`);
counterOfLoadedComments.classList.add(`hidden`);

document.body.classList.add(`modal-open`);
