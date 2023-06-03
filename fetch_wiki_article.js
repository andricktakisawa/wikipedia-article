function fetchArticle(language) {
    $.get("fetch_wiki_article.php", { lang: language }, function (data) {
        const jsonData = JSON.parse(data);
        const pages = jsonData.query.pages;
        const pageId = Object.keys(pages)[0];
        const article = pages[pageId];
        const maxCharacters = 250;
        const contentElement = document.getElementById('article-content');
        const content = article.extract;
        document.getElementById('article-title').innerText = article.title;
        document.getElementById('article-image').src = article.thumbnail ? article.thumbnail.source : "https://dummyimage.com/500x500/fff/aaa";
        document.getElementById('article-link').href = article.fullurl;

        if (content.length > maxCharacters) {
            const trimmedContent = content.substring(0, maxCharacters).trim();
            contentElement.innerText = trimmedContent + '...';
        } else {
            contentElement.innerText = content;
        }
    });
}


function updatePage(language) {
    var titleElement = document.getElementById('wiki-title_art');
    var buttonElement = document.getElementById('article-link_btn');
    var rechargeBtnElement = document.getElementById('recharge_btn');
    var imageElement = document.getElementById('article-image');

    switch (language) {
        case 'es':
            titleElement.textContent = 'Artículo destacado de Wikipedia';
            buttonElement.textContent = 'Ver artículo completo';
            rechargeBtnElement.textContent = 'Recargar';
            break;
        case 'en':
            titleElement.textContent = 'Featured Wikipedia article';
            buttonElement.textContent = 'View complete article';
            rechargeBtnElement.textContent = 'Reload';
            break;
        case 'fr':
            titleElement.textContent = 'Article en vedette de Wikipedia';
            buttonElement.textContent = "Voir l'article complet";
            rechargeBtnElement.textContent = 'Recharger';
            break;
        default:
            titleElement.textContent = 'Select a language to start';
            buttonElement.textContent = 'View complete article';
            rechargeBtnElement.textContent = 'Recharger';
    }

    buttonElement.classList.remove("dontshowbtn");
    rechargeBtnElement.classList.remove("dontshowbtn");
    imageElement.classList.remove("dontshowimg");
}

$(document).ready(function () {
    const languageSelect = document.getElementById('language-select');

    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
        languageSelect.value = storedLanguage;
        updatePage(storedLanguage);
    }

    fetchArticle(languageSelect.value);

    languageSelect.addEventListener('change', function () {
        localStorage.setItem('language', this.value);
        fetchArticle(this.value);
        updatePage(this.value);
    });
});
