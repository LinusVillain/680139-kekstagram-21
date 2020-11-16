'use strict';

(function () {

  const RANDOM_POST_COUNT = 10;
  const buttonDefault = document.querySelector(`#filter-default`);
  const buttonRandom = document.querySelector(`#filter-random`);
  const buttonDiscussed = document.querySelector(`#filter-discussed`);

  const removeActiveClass = () => {
    let buttonSelected = document.querySelector(`.img-filters__button--active`);

    if (buttonSelected) {
      buttonSelected.classList.remove(`img-filters__button--active`);
    }
  };

  // Рендер постов по умолчанию

  buttonDefault.addEventListener(`click`, window.utils.debounce(function () {
    removeActiveClass();
    buttonDefault.classList.add(`img-filters__button--active`);

    const defaultPosts = window.gallery.dataPosts();
    window.gallery.renderPosts(defaultPosts);
  }));

  // Рендер случайных постов

  buttonRandom.addEventListener(`click`, window.utils.debounce(function () {
    removeActiveClass();
    buttonRandom.classList.add(`img-filters__button--active`);

    const newPosts = [];

    window.gallery.dataPosts().forEach((post) => {
      newPosts.push(post);
    });

    const randomPosts = window.utils.shuffleArray(newPosts).slice(0, RANDOM_POST_COUNT);
    window.gallery.renderPosts(randomPosts);
  }));

  // Рендер обсуждаемых постов

  buttonDiscussed.addEventListener(`click`, window.utils.debounce(function () {
    removeActiveClass();
    buttonDiscussed.classList.add(`img-filters__button--active`);

    const newPosts = [];

    window.gallery.dataPosts().forEach((post) => {
      newPosts.push(post);
    });

    const discussedPosts = newPosts.sort((a, b) => b.comments.length - a.comments.length);
    window.gallery.renderPosts(discussedPosts);
  }));

})();
