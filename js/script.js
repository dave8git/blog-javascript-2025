'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const allLinks = document.querySelectorAll('.titles a');
  for (let link of allLinks){
    link.classList.remove('active');
  }
  this.classList.add('active');
  const activeArticleSelector = this.getAttribute('href');
  removeArticlePostsActive();
  document.querySelector(activeArticleSelector).classList.add('active');
};

const generateTitleLinks = function(customSelector = '') {
  const allArticlePosts = document.querySelectorAll('article.post' + customSelector);
  const titleList = document.querySelector('.list.titles');
  let htmlLinks = '';
  for (let article of allArticlePosts) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector('.post-title').innerHTML;
    const htmlLink = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    htmlLinks += htmlLink;
  }
  titleList.innerHTML = htmlLinks;

  const allLinks = document.querySelectorAll('.titles a');

  for (let link of allLinks){
    link.addEventListener('click', titleClickHandler);
  }
};

generateTitleLinks();

const removeArticlePostsActive = function(){
  const allArticlePosts = document.querySelectorAll('article.post');
  for (let articlePost of allArticlePosts){
    articlePost.classList.remove('active');
  }
};

function generateTags() {
  const allArticles = document.querySelectorAll('article.post');
  for (let article of allArticles) {
    const tagsWrapper = article.querySelector('.post-tags .list');
    const articleTags = article.getAttribute('data-tags').split(' ');
    let html = '';
    for (let tag of articleTags) {
      const htmlTag = `<li><a href="#tag-${tag}"><span>${tag}</span></a></li> `;
      html += htmlTag;
    }
    tagsWrapper.innerHTML = html;
  }
  generateTitleLinks();
}

generateTags();

function addClickListenersToTags() {
  const allTagsLinks = document.querySelectorAll('.post-tags a');
  for (let tagLink of allTagsLinks) {
    tagLink.addEventListener('click', tagClickHandler);
  }
}

const tagClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  const tag = clickedElement.getAttribute('href').replace('#tag-', '');
  const allTagsLinks = document.querySelectorAll('.post-tags a.active');
  for (let tagLink of allTagsLinks) {
    tagLink.classList.remove('active');
  }
  clickedElement.classList.add('active');
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

addClickListenersToTags();

const generateAuthors = function() {
  const allArticles = document.querySelectorAll('article.post');
  for (let article of allArticles) {
    const authorsWrapper = article.querySelector('.post-author');
    const authorName = article.getAttribute('data-author');
    const htmlAuthor = `<a href="#author-${authorName}"><span>${authorName}</span></a>`;
    authorsWrapper.innerHTML = htmlAuthor;
  }
};

generateAuthors();

const addClickListenersToAuthors = function() {
  const allAuthorLinks = document.querySelectorAll('.post-author a');
  for (let authorLink of allAuthorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
};

const authorClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  const author = clickedElement.getAttribute('href').replace('#author-', '');
  generateTitleLinks('[data-author="' + author + '"]');
};

addClickListenersToAuthors();


