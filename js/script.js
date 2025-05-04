'use strict';

const titleClickHandler = function(event){
    event.preventDefault();
    for (let link of allLinks){
        link.classList.remove('active');
    }
    this.classList.add('active');
    const activeArticleSelector = this.getAttribute('href');
    removeArticlePostsActive();
    document.querySelector(activeArticleSelector).classList.add('active');
}

const allArticlePosts = document.querySelectorAll('article.post');
console.log(allArticlePosts);
const generateTitleLinks = function(){
    const titleList = document.querySelector('.list.titles');
    let htmlLinks = '';
    for (let article of allArticlePosts) {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector('.post-title').innerHTML
        const htmlLink = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
        htmlLinks += htmlLink;
    }
    titleList.innerHTML = htmlLinks;
}

generateTitleLinks();

const removeArticlePostsActive = function(){
    for (let articlePost of allArticlePosts){
        articlePost.classList.remove('active');
    }
}

const allLinks = document.querySelectorAll('.titles a');

for (let link of allLinks){
    link.addEventListener('click', titleClickHandler);
}