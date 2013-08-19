'use strict';

angular.module('tmh.dynamicLocale', []).provider('tmhDynamicLocale', function() {

  var localeLocationPattern = 'angular/i18n/angular-locale_{{locale}}.js';

  /**
   * Loads a script asynchronously
   *
   * @param {string} url The url for the script
   @ @param {function) callback A function to be called once the script is loaded
   */
  function loadScript(url, callback) {
    var script = document.createElement('script'),
      head = document.getElementsByTagName('head')[0];

    script.type = 'text/javascript';
    if (script.readyState) { // IE
      script.onreadystatechange = function () {
        if (script.readyState === 'loaded' ||
            script.readyState === 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else { // Others
      script.onload = function () {
        callback();
      };
    }
    script.src = url;
    script.async = false;
    head.insertBefore(script, head.firstChild);
  }

  /**
   * Loads a locale and replaces the properties from the current locale with the new locale information
   *
   * @param localeUrl The path to the new locale
   * @param $locale The locale at the curent scope
   */
  function loadLocale(localeUrl, $locale, localeId, $rootScope) {
    loadScript(localeUrl, function () {
      function overrideValues(oldObject, newObject) {
        angular.forEach(newObject, function(value, key) {
          if (angular.isArray(newObject[key]) || angular.isObject(newObject[key])) {
            overrideValues(oldObject[key], newObject[key]);
          } else {
            oldObject[key] = newObject[key];
          }
        });
      }

      // Create a new injector with the new locale
      var localInjector = angular.injector(['ngLocale']),
        externalLocale = localInjector.get('$locale');

      overrideValues($locale, externalLocale);

      $rootScope.$broadcast('$localeChangeSuccess', localeId, $locale);
      $rootScope.$apply();
    });
  }

  this.localeLocationPattern = function(value) {
    if (value) {
      localeLocationPattern = value;
      return this;
    } else {
      return localeLocationPattern;
    }
  };

  this.$get = ['$rootScope', '$interpolate', '$locale', function($rootScope, interpolate, locale) {
    var localeLocation = interpolate(localeLocationPattern);

    return {
      /**
       * @ngdoc method
       * @description
       * @param {string=} value Sets the locale to the new locale. Changing the locale will trigger
       *    a background task that will retrieve the new locale and configure the current $locale
       *    instance with the information from the new locale
       */
      set: function(value) {
        loadLocale(localeLocation({locale: value}), locale, value, $rootScope);
      }
    };
  }];

});
