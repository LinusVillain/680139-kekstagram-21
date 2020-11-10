'use strict';

(function () {

  const COUNT = 25;
  let posts = [];
  const postTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const picturesBlock = document.querySelector(`.pictures`);
  const EXIT_BUTTON = `Escape`;
  const postBlock = document.querySelector(`.big-picture`);
  const postImage = postBlock.querySelector(`.big-picture__img`);
  const postLikes = postBlock.querySelector(`.likes-count`);
  const countOfComments = postBlock.querySelector(`.comments-count`);
  const postDescription = postBlock.querySelector(`.social__caption`);
  const cancelButton = postBlock.querySelector(`.big-picture__cancel`);
  const commentsBlock = document.querySelector(`.social__comments`);
  const commentsLoader = postBlock.querySelector(`.comments-loader`);

  const deleteComments = function () {
    const commentsArray = commentsBlock.querySelectorAll(`.social__comment`);
    for (let i = 0; i < commentsArray.length; i++) {
      commentsArray[i].remove();
    }
  };

  const onCancelClick = () => {
    postBlock.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    deleteComments();
  };

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

  const createComments = function (post, alreadyCreated) {
    const commentsFragment = document.createDocumentFragment();

    // // TEST
    // let alreadyCreated = 0;
    // for (let i = 0; i < post.comments.length / 5; i++) {
    //   console.log(post.comments.slice(alreadyCreated, alreadyCreated + 5));
    //   alreadyCreated += 5;
    // }

    let commentsToRender = post.comments.slice(alreadyCreated, alreadyCreated + 5);
    for (let i = 0; i < commentsToRender.length; i++) {
      commentsFragment.appendChild(createComment(commentsToRender[i]));
    }
    // END TEST

    // for (let i = 0; i < post.comments.length; i++) {
    //   commentsFragment.appendChild(createComment(post.comments[i]));
    // }

    commentsBlock.appendChild(commentsFragment);
  };

  const onPostElementClick = (photo) => {
    let commentsCounter = 0;
    postBlock.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);

    postImage.children[0].src = photo.url;
    postLikes.textContent = photo.likes;
    countOfComments.textContent = photo.comments.length;
    postDescription.textContent = photo.description;

    deleteComments();

    createComments(photo, commentsCounter);

    commentsLoader.addEventListener(`click`, function () {
      console.log(commentsCounter);
      commentsCounter += 5;
      createComments(photo, commentsCounter);
    });

    cancelButton.addEventListener(`click`, onCancelClick);

    document.addEventListener(`keydown`, (event) => {
      if (event.key === EXIT_BUTTON) {
        onCancelClick();
      }
    });
  };

  const createPost = (photo) => {
    const postElement = postTemplate.cloneNode(true);
    const image = postElement.querySelector(`.picture__img`);
    const likes = postElement.querySelector(`.picture__likes`);
    const comments = postElement.querySelector(`.picture__comments`);

    image.src = photo.url;
    likes.textContent = photo.likes;
    comments.textContent = photo.comments.length;

    postElement.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      onPostElementClick(photo);
    });

    return postElement;
  };

  const createPosts = () => {
    const postFragment = document.createDocumentFragment();

    for (let i = 0; i < posts.length; i++) {
      postFragment.appendChild(createPost(posts[i]));
    }

    picturesBlock.appendChild(postFragment);
  };

  posts = window.data.generatePosts(COUNT);

  createPosts();

  window.posts = {
    posts
  };

})();
