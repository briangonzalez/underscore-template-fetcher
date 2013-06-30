
# underscore-template-fetcher

### Usage
underscore-template-fetcher is a small utility function built on top of [underscorejs](http://underscorejs.org). It adds to underscore another utility function, `_.fetchTemplate()`, which can be used like so:

```javascript
// fetch a template -- /templates/my-awesome-template.jst -- then compile it
_.fetchTemplate('my-awesome-template')
var raw = _.fetchTemplate('my-awesome-template');
var t   = _.template(raw, { text: 'woot' });
````

### Explained
In essence, underscore-template-fetcher exposes the following two methods, a fetch method and config method: 

```javascript
// Fetch a template
_.fetchTemplate(name [, namespace] [,extension] );

// Setup config for fetching templates. Valid opts include:
var defaults =  {
    namespaces: { default: "/templates/" },
    extension:  ".jst"  
  };
_.templateFetcherSettings(defaults);
````

This method assumes all of your templates live under `/templates/` and have a file extension `.jst`. There is no need to call `_.templateFetcherSettings(defaults);` if you're happy with the defaults.

### Advanced

In certain apps, you may have templates located under various endpoints. Setup namepaces pointed at these endpoints like so:

```javascript
// setup underscore-template-fetcher 
_.templateFetcherSettings({
  namespaces: {
    default:    '/my-templates/',
    hovercard:  '/templates/hovercard/',
    dialog:     '/plugins/dialogs/'
  },
  extension:  '.tmpl'
});

// fetch a template located at "/my-templates/awesome-template.tmpl"
_.fetch('awesome-template')

// fetch a template located at "/templates/hovercard/profile.tmpl"
_.fetch('profile', 'hovercard')

// fetch a template located at "/plugins/dialogs/confirm.jst"
_.fetch('confirm', 'dialog', '.jst')

```` 

### Dependencies

Depends on underscore.js and jQuery.

### Testing

You can run the test suite by running `grunt server` then pointing your browser at [localhost:8000/test.html](localhost:8000/test.html).

