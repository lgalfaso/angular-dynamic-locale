# Angular Dynamic Locale

***

## Usage

### Requirements

* **AngularJS v1.0.7+** is currently required.

### Changing the locale

This module defines two services, these are `tmhDynamicLocale` and
`tmhDynamicLocaleCache`.

The service `tmhDynamicLocale` provides has one method `set(newLocale)` to
change the locale.

```javascript
tmhDynamicLocale.set('it');
```

Keep in mind that the locale will be changed asynchronously 


The service `tmhDynamicLocaleCache` is a `$cache` of all the loaded locales,
where the key is the locale id and the value is the locale object.


This module expects for the angular locales to be present at
`angular/i18n/angular-locale_{{locale}}.js`.
If the locales are at another URL, this can be changed at
`tmhDynamicLocaleProvider` using `localeLocationPattern(string)`.


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
$ grunt karma:unit
```
to run the test once

or

```bash
$ grunt karma:autotest
```
to run the tests continuously

