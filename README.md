# Angular Dynamic Locale

***

## Usage

### Requirements

* **AngularJS v1.0.7+** is currently required.

### Changing the locale

This module defines one service called `tmhDynamicLocale` that provides
one method called `set(newLocale)`. To change the locale, just call
this method with the new locale for the application

```javascript
tmhDynamicLocale.set('it');
```

Keep in mind that the locale will be changed asynchronously 

This module expects that the angular locales to be present at
`angular/i18n/angular-locale_{{locale}}.js`.
If you have the angular locales at another path, this can be changed
at `tmhDynamicLocaleProvider` using `localeLocationPattern(string)`.


## Installation

Add the module to your dependencies

```javascript
angular.module('myApp', ['tmh.dynamiclocale', ...])
```


## Development

### Requirements

0. Install [Node.js](http://nodejs.org/) and NPM (should come with)

1. Install global dependencies `grunt-cli` and `bower`:

    ```bash
    $ npm install -g grunt-cli bower
    ```

2. Install local dependencies:

    ```bash
    $ npm install
    $ bower install
    ```

### Running the tests

    ```bash
    $ grunt karma
    ```

