# CSSClear

CSSClear is a tool for removing unused CSS code from your code base. It's like [UnCSS](https://github.com/uncss/uncss), but more usable for non-static sites with huge stylesheets. 

## Installation

```shell
npm install -g cssclear
```

## Usage

### Init and get CSS selectors

First, you have to initialize this tool and get JS files for using on your WEB pages. Such files will be copied to *destination DIR*.

```shell
cssclear init <path to destination DIR ... >
```

Next, you have to collect CSS selectors from your existing CSS files:

```shell
cssclear index <base> <file>
```

where:
- **base** (String): Path to directory with CSS files

- **file** (String): Path to JSON file that will be created

After this, you will receive `JSON` file with all CSS selectors of your project.

### Integrate with your HTML pages

Next step, you have to integrate JS files to your HTML pages. You have to add some JS code to your HTML. 

```html
<script>
    var cssClear = {
        pathToSelectors: 'https://yourdomain.com/selectors.json',
        storageKey: encodeURI(location.pathname),
        dataStoreProvider: {
            name: 'postData',
            options: {
                apiKey: "d58e3582afa99040e27b92b13c8f2280",
                URL: 'https://apidomain.com/save/point/'
            }
        }
    };
</script>
<script type="module" src="path/to/csscleaner.bundle.js"></script>
```

JS client looks for selectors from JSON (for example, `https://yourdomain.com/selectors.json`) on your HTML pages and keeps only 'live' of them.

- **pathToSelectors** (String): URL path to JSON file with CSS selectors (see *Init and get CSS selectors*)

- **storageKey** (String): Unique key for a page (by default may be URI)

- **dataStoreProvider** (Object): Data storage method configuration

- **dataStoreProvider.name** (String): Data storage method type. You should use one the variants: `postData`, `firebase`

- **dataStoreProvider.options** (Object): Object with configurations parameters for *dataStoreProvider*

#### dataStoreProvider

**CSSClean** supports two variants for saving data to the persistent remote storage. We call this mechanism *dataStoreProvider*. You can post the result of works JS client to your custom script on the server side (`dataStoreProvider.name = 'postData'`) or save to [Firebase Realtime Database](https://firebase.google.com/docs/database/) (`dataStoreProvider.name = 'firebase'`).

For **postData** type, you should receive and save data to your own database. For example, in the case with PHP your `https://apidomain.com/save/point/` should look like:

```php
<?php
header('Access-Control-Allow-Origin: *');
$data = file_get_contents('php://input');
// there you should save data to the DB
```






To be continued...
