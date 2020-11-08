'use strict';

(function () {

  const commentToPost = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];
  const userName = [`Артем`, `Наташа`, `Богдан`, `Аня`, `Марина`, `Сергей`];

  const getCommentsArray = function () {
    const length = window.utils.getRandomInt(1, 6);
    const array = [];
    for (let i = 0; i < length; i++) {
      array.push(
          {
            avatar: `img/avatar-` + (window.utils.getRandomInt(1, 6)) + `.svg`,
            message: window.utils.shuffleArray(commentToPost)[1],
            name: window.utils.shuffleArray(userName)[1]
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
            likes: window.utils.getRandomInt(15, 200),
            comments: getCommentsArray()
          }
      );
    }
    return array;
  };

  window.data = {
    generatePosts: generatePosts
  };

})();
