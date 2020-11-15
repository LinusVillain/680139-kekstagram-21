'use strict';

(function () {

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

  buttonDefault.addEventListener(`click`, function () {
    removeActiveClass();
    buttonDefault.classList.add(`img-filters__button--active`);
    let defaultPosts = window.backend.responsePosts;
    console.log(window.backend.responsePosts);
    window.posts.createPosts(defaultPosts);
  });

  buttonRandom.addEventListener(`click`, function () {
    removeActiveClass();
    buttonRandom.classList.add(`img-filters__button--active`);
    const newPosts = [];
    window.backend.responsePosts.forEach((post) => {
      newPosts.push(post);
    });
    let randomPosts = window.utils.shuffleArray(newPosts).slice(0, 10);
    console.log(randomPosts);
    window.posts.createPosts(randomPosts);
  });

  buttonDiscussed.addEventListener(`click`, function () {
    removeActiveClass();
    buttonDiscussed.classList.add(`img-filters__button--active`);
  });

})();
