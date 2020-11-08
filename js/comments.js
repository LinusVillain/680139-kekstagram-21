'use strict';

(function () {

  // const postBlock = document.querySelector(`.big-picture`);   чтоб линтер не ругался за неиспользуемую переменную
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

  postImage.children[0].src = window.posts.posts[0].url;
  likes.textContent = window.posts.posts[0].likes;
  comments.textContent = window.posts.posts[0].comments.length;
  description.textContent = window.posts.posts[0].description;

  deleteComments(commentsArray, commentsBlock);

  window.posts.render(createComments(window.posts.posts[0]), commentsBlock);

  counterOfComments.classList.add(`hidden`);
  counterOfLoadedComments.classList.add(`hidden`);

  // document.body.classList.add(`modal-open`); для работы с заданием 4.1.

})();
