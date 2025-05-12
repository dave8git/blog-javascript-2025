/* global calculateTagsParams */
'use strict';

const titleClickHandler = function(event){
  event.preventDefault();
  const allLinks = document.querySelectorAll('.titles a');
  for (let link of allLinks) link.classList.remove('active');
  this.classList.add('active');
  const activeArticleSelector = this.getAttribute('href');
  removeArticlePostsActive();
  document.querySelector(activeArticleSelector).classList.add('active');
};

const generateTitleLinks = function(customSelector = ''){
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
  for (let link of allLinks) link.addEventListener('click', titleClickHandler);
};

const removeArticlePostsActive = function(){
  const allArticlePosts = document.querySelectorAll('article.post');
  for (let articlePost of allArticlePosts) articlePost.classList.remove('active');
};

const calculateTagClass = function(count, obj){
  const classCount = 5;
  const classBase = 1;
  return Math.floor(((count - obj.min) / (obj.max - obj.min)) * classCount + classBase);
};

function generateTags(){
  let allTags = {};
  const allArticles = document.querySelectorAll('article.post');
  for (let article of allArticles) {
    const tagsWrapper = article.querySelector('.post-tags .list');
    const articleTags = article.getAttribute('data-tags').split(' ');
    let html = '';
    for (let tag of articleTags) {
      const htmlTag = `<li><a href="#tag-${tag}"><span>${tag}</span></a></li>`;
      html += htmlTag;
      allTags[tag] = allTags[tag] ? allTags[tag] + 1 : 1;
    }
    tagsWrapper.innerHTML = html;
  }
  generateTitleLinks();
  const tagList = document.querySelector('.tags.list');
  let allTagsHTML = '';
  for (let tag in allTags) {
    allTagsHTML += `<li><a href="#tag-${tag}" class="tag-size-${calculateTagClass(allTags[tag], calculateTagsParams(allTags))}">${tag}</a></li>`;
  }
  tagList.innerHTML = allTagsHTML;
}

const tagClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  const tag = clickedElement.getAttribute('href').replace('#tag-', '');
  const allTagsLinks = document.querySelectorAll('.post-tags a.active');
  for (let tagLink of allTagsLinks) tagLink.classList.remove('active');
  clickedElement.classList.add('active');
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

function addClickListenersToTags(){
  const allTagsLinks = document.querySelectorAll('.post-tags a');
  for (let tagLink of allTagsLinks) tagLink.addEventListener('click', tagClickHandler);
  const tagCloudLinks = document.querySelectorAll('.tags.list a');
  for (let tagLink of tagCloudLinks) tagLink.addEventListener('click', tagClickHandler);
}

const generateAuthors = function(){
  const allArticles = document.querySelectorAll('article.post');
  let allAuthors = [];
  for (let article of allArticles) {
    const authorsWrapper = article.querySelector('.post-author');
    const authorName = article.getAttribute('data-author');
    const htmlAuthor = `<li><a href="#author-${authorName}"><span>${authorName}</span></a></li>`;
    if (!allAuthors.includes(htmlAuthor)) allAuthors.push(htmlAuthor);
    authorsWrapper.innerHTML = htmlAuthor;
  }
  const authorsList = document.querySelector('.list.authors');
  authorsList.innerHTML = allAuthors.join(' ');
};

const authorClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  const author = clickedElement.getAttribute('href').replace('#author-', '');
  generateTitleLinks('[data-author="' + author + '"]');
};

const addClickListenersToAuthors = function(){
  const allAuthorLinks = document.querySelectorAll('.post-author a');
  for (let authorLink of allAuthorLinks) authorLink.addEventListener('click', authorClickHandler);
  const columnAuthorLinks = document.querySelectorAll('.list.authors li a');
  for (let columnAuthorLink of columnAuthorLinks) columnAuthorLink.addEventListener('click', authorClickHandler);
};

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();