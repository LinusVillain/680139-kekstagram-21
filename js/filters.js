'use strict';

(function () {

  const RANDOM_POST_COUNT = 10;
  const buttons = document.querySelectorAll(`.img-filters__button`);
  const buttonDefault = document.querySelector(`#filter-default`);
  const buttonRandom = document.querySelector(`#filter-random`);
  const buttonDiscussed = document.querySelector(`#filter-discussed`);

  const removeActiveClass = () => {
    buttons.forEach((button) => {
      if (button.classList.contains(`img-filters__button--active`)) {
        button.classList.remove(`img-filters__button--active`);
      }
    });
  };

  buttonDefault.addEventListener(`click`, window.utils.debounce(function () {
    removeActiveClass();
    buttonDefault.classList.add(`img-filters__button--active`);
    const defaultPosts = window.backend.responsePosts;
    window.posts.createPosts(defaultPosts);
  }));

  buttonRandom.addEventListener(`click`, window.utils.debounce(function () {
    removeActiveClass();
    buttonRandom.classList.add(`img-filters__button--active`);
    const newPosts = [];
    window.backend.responsePosts.forEach((post) => {
      newPosts.push(post);
    });
    const randomPosts = window.utils.shuffleArray(newPosts).slice(0, RANDOM_POST_COUNT);
    window.posts.createPosts(randomPosts);
  }));

  buttonDiscussed.addEventListener(`click`, window.utils.debounce(function () {
    removeActiveClass();
    buttonDiscussed.classList.add(`img-filters__button--active`);
    const newPosts = [];
    window.backend.responsePosts.forEach((post) => {
      newPosts.push(post);
    });
    const discussedPosts = newPosts.sort((a, b) => b.comments.length - a.comments.length);
    window.posts.createPosts(discussedPosts);
  }));

})();
