'use strict';

const titleClickHandler = function(event){
    event.preventDefault();
    for (let article of allArticles){
        article.classList.remove('active');
    }
    this.classList.add('active');
    const activeArticleSelector = this.getAttribute('href');
    removeArticlePostsActive();
    document.querySelector(activeArticleSelector).classList.add('active');
}

const removeArticlePostsActive = function(){
    const allArticlePosts = document.querySelectorAll('article.post');
    for (let articlePost of allArticlePosts){
        articlePost.classList.remove('active');
    }
}

const allArticles = document.querySelectorAll('.titles a');

for (let article of allArticles) {
    article.addEventListener('click', titleClickHandler);
}