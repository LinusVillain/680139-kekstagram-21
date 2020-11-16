'use strict';

(function () {

  const LOAD_STEP = 5;
  let dataPosts = [];
  const postTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const picturesBlock = document.querySelector(`.pictures`);
  const EXIT_BUTTON = `Escape`;
  const ENTER_BUTTON = `Enter`;
  const postBlock = document.querySelector(`.big-picture`);
  const postImage = postBlock.querySelector(`.big-picture__img`);
  const postLikes = postBlock.querySelector(`.likes-count`);
  const countOfComments = postBlock.querySelector(`.comments-count`);
  const postDescription = postBlock.querySelector(`.social__caption`);
  const cancelButton = postBlock.querySelector(`.big-picture__cancel`);
  const commentsBlock = document.querySelector(`.social__comments`);
  const commentsLoader = postBlock.querySelector(`.comments-loader`);
  const loadedComments = postBlock.querySelector(`.social__comment-count`);
  const filters = document.querySelector(`.img-filters`);

  // Создание и добавление комментариев

  const createComment = (comment) => {
    const newComment = document.createElement(`li`);
    newComment.classList.add(`social__comment`);

    const userPicture = document.createElement(`img`);
    userPicture.classList.add(`social__picture`);
    userPicture.src = comment.avatar;
    userPicture.alt = comment.name;
    userPicture.width = `35`;
    userPicture.height = `35`;
    newComment.append(userPicture);

    const commentText = document.createElement(`p`);
    commentText.classList.add(`social__text`);
    commentText.textContent = comment.message;
    newComment.append(commentText);

    return newComment;
  };

  const createComments = (post, alreadyCreated) => {
    const commentsFragment = document.createDocumentFragment();

    let commentsToRender = post.comments.slice(alreadyCreated, alreadyCreated + 5);

    for (let i = 0; i < commentsToRender.length; i++) {
      commentsFragment.appendChild(createComment(commentsToRender[i]));
    }

    commentsBlock.appendChild(commentsFragment);
  };

  const onPostElementClick = (photo) => {

    const deleteComments = () => {
      const commentsArray = commentsBlock.querySelectorAll(`.social__comment`);

      for (let i = 0; i < commentsArray.length; i++) {
        commentsArray[i].remove();
      }
    };

    const onCancelClick = () => {
      postBlock.classList.add(`hidden`);
      document.body.classList.remove(`modal-open`);

      deleteComments();

      commentsLoader.removeEventListener(`click`, createCommentsHandler);
    };

    // Прогрузка блока с 5 комментариями

    const createCommentsHandler = () => {
      commentsCounter += LOAD_STEP;
      createComments(photo, commentsCounter);

      if ((photo.comments.length - commentsCounter) <= LOAD_STEP) {
        loadedComments.textContent = `${commentsCounter + (photo.comments.length - commentsCounter)} из ${photo.comments.length} комментариев`;
        commentsLoader.classList.add(`hidden`);
        commentsLoader.removeEventListener(`click`, createCommentsHandler);
      } else {
        loadedComments.textContent = `${commentsCounter + LOAD_STEP} из ${photo.comments.length} комментариев`;
      }
    };

    let commentsCounter = 0;
    if (photo.comments.length > LOAD_STEP) {
      commentsLoader.classList.remove(`hidden`);
    } else {
      commentsLoader.classList.add(`hidden`);
    }

    postBlock.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);

    postImage.children[0].src = photo.url;
    postLikes.textContent = photo.likes;
    countOfComments.textContent = photo.comments.length;
    postDescription.textContent = photo.description;

    deleteComments();

    createComments(photo, commentsCounter);

    if (photo.comments.length <= LOAD_STEP) {
      if (photo.comments.length === 1) {
        loadedComments.textContent = `${photo.comments.length} из ${photo.comments.length} комментария`;
      } else {
        loadedComments.textContent = `${photo.comments.length} из ${photo.comments.length} комментариев`;
      }
    } else {
      loadedComments.textContent = `${LOAD_STEP} из ${photo.comments.length} комментариев`;
    }

    if (photo.comments.length > LOAD_STEP) {
      commentsLoader.addEventListener(`click`, createCommentsHandler);
    }

    cancelButton.addEventListener(`click`, onCancelClick);

    document.addEventListener(`keydown`, (evnt) => {
      if (evnt.key === EXIT_BUTTON) {
        onCancelClick();
      }
    });
  };

  // Очищение галлерреи

  const removePosts = () => {
    const oldPictures = document.querySelectorAll(`.picture`);

    oldPictures.forEach((picture) => {
      picture.remove();
    });
  };

  // Создание и добавление поста

  const createPost = (photo) => {
    const postElement = postTemplate.cloneNode(true);
    const image = postElement.querySelector(`.picture__img`);
    const likes = postElement.querySelector(`.picture__likes`);
    const comments = postElement.querySelector(`.picture__comments`);

    image.src = photo.url;
    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;

    postElement.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      onPostElementClick(photo);
    });

    postElement.addEventListener(`keydown`, (evtDown) => {
      if (evtDown.key === ENTER_BUTTON) {
        evtDown.preventDefault();
        onPostElementClick(photo);
      }
    });

    return postElement;
  };

  const renderPosts = (data) => {
    removePosts();

    const postFragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      postFragment.appendChild(createPost(data[i]));
    }

    picturesBlock.appendChild(postFragment);
  };

  // Получение данных с сервера

  const createPosts = (responsePosts) => {
    dataPosts = responsePosts.slice();
    renderPosts(responsePosts);
    filters.classList.remove(`img-filters--inactive`);
  };

  window.backend.load(createPosts, window.backend.loadError);

  window.gallery = {
    dataPosts: () => dataPosts,
    createPosts,
    renderPosts
  };

})();
