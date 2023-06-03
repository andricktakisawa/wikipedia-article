
# Wikipedia random article

The WIKIPEDIA API showing a random article. It shows image, title and extract of it. Available in 3 different languages.



## Acknowledgements

 - [Wikipedia API](https://en.wikipedia.org/w/api.php)


## API Reference
The Wikipedia Featured Article application uses the MediaWiki API, which is an application programming interface (API) that provides web services for interacting with Wiki software.

### endpoints
#### Random Article

URL: ```https://" + lang + ".wikipedia.org/w/api.php```

#### Parameters:

```format: json ```

``` action: query```

```generator: random```

```grnnamespace: 0```

```prop: extracts|pageimages|info```

```pithumbsize: 500```

```inprop: url```

```exintro:```

```explaintext:```

These parameters generate a random article with its excerpt, image (if any), and the URL of the full article.

#### Responses
The API returns a JSON object that contains the relevant information for the article. Here are the most important properties:

title: The title of the article.

extract: The extract of the article.

thumbnail: The thumbnail image of the article. If there is no image, this field may not be present.

source: The URL of the image.

fullurl: The URL of the full article on Wikipedia.

#### Example of use
Our application's JavaScript code uses jQuery to make a GET request to the MediaWiki API:

```function fetchArticle(language) {
    $.get("fetch_wiki_article.php", { lang: language }, function (data) {
        const jsonData = JSON.parse(data);
        const pages = jsonData.query.pages;
        const pageId = Object.keys(pages)[0];
        const article = pages[pageId];
        document.getElementById('article-title').innerText = article.title;
        document.getElementById('article-content').innerText = article.extract;
        document.getElementById('article-image').src = article.thumbnail ? article.thumbnail.source : "https://dummyimage.com/500x500/fff/aaa";
        document.getElementById('article-link').href = article.fullurl;
    });
}
```

Este ejemplo utiliza la función fetchArticle para hacer una solicitud GET a la API de Wikipedia. La función recibe como parámetro el código de idioma y procesa la respuesta para mostrar el artículo en la página.

## Authors

- [@andricktakisawa](https://www.github.com/andricktakisawa)


## Run Locally

Clone the project

```bash
  git clone https://github.com/andricktakisawa/wikipedia-article.git
```

Go to the project directory

```bash
  cd wikipedia-article
```

Start the server

```bash
  php -S localhost:8000
  ```


## Used By

This project is used by the following companies:

- EduZone


## Optimizations

### 1. Custom Language Selection

Customized the language selection to display different titles and button texts depending on the selected language:
```
document.getElementById('language-select').addEventListener('change', function () {
    var language = this.value;
    var titleElement = document.getElementById('wiki-title_art');

    switch (language) {
        case 'es':
            titleElement.textContent = 'Artículo destacado de Wikipedia';
            break;
        case 'en':
            titleElement.textContent = 'Featured Wikipedia article';
            break;
        case 'fr':
            titleElement.textContent = 'Article en vedette de Wikipedia';
            break;
        default:
            titleElement.textContent = 'Select a language to start';
    }
});
```


### 2. Hiding and Showing Elements
Item and button image hiding until a language is selected has been implemented. When selecting a language, the image and button appear:
```
document.getElementById('language-select').addEventListener('change', function () {
    var language = this.value;
    var titleElement = document.getElementById('article-link_btn');
    var imageElement = document.getElementById('article-image');
    titleElement.classList.remove("dontshowbtn");
    imageElement.classList.remove("dontshowimg");
});

```

### 3.Language Selection Persistence
Implemented persistence of language selection using browser local storage. When a language is selected, it is saved to local storage, which is loaded when the page is opened. This means that the user will not lose their language selection even if they close the page and reopen it later.
## FAQ

#### Question: What does this app do?

Answer: This application displays a featured Wikipedia article in the selected language. Articles are randomly selected from the Wikipedia database.

#### Question: How do I select a language?

Answer: There is a language selector at the top of the page. You can select between English, Spanish and French.

#### Question: I have selected a language, but I don't see any change. What's going on?

Answer: Please make sure you have selected a language from the dropdown list and that your internet connection is working. If you still don't see any changes, refresh the page.

#### Question: Why do the title and the "View Complete Article" button change languages?

Answer: We have customized the application so that these elements change according to the selected language to improve the user experience.

#### Question: I don't see the article image or "View Full Article" button until I select a language. Because?

Answer: We have designed the app so that the item image and button are hidden until you select a language. This was done to improve the aesthetics and functionality of the page.

#### Question: I refreshed the page and now I see the text "Select a language to start" instead of the article title. What happened?

Answer: We have fixed this issue in a recent update. Now, when loading the page, it checks if there is a language stored in the browser's local storage and updates the page elements according to this language.

#### Question: What happens if I close the page and then open it again? Will I lose my language selection?

Answer: No, we have implemented the persistence of the language selection using the browser's local storage. When you select a language, it is saved to local storage, which is loaded when you open the page. This means that you will not lose your language selection even if you close the page and reopen it later.
