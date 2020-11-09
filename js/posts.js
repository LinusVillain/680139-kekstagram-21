'use strict';

(function () {

  const COUNT = 25;
  let posts = [];
  const postTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const picturesBlock = document.querySelector(`.pictures`);

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

  posts = window.data.generatePosts(COUNT);

  render(createPosts(posts), picturesBlock);

  window.posts = {
    posts,
    render
  };

})();
