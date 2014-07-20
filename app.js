angular.module('DynamicLocaleExample', ['tmh.dynamicLocale'])
  .config(function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('https://code.angularjs.org/1.2.20/i18n/angular-locale_{{locale}}.js');
  })
  .controller('ExampleCtrl', function($rootScope, tmhDynamicLocale, $locale) {
    $rootScope.availableLocales = {
      'en': 'English',
      'de': 'German',
      'fr': 'French',
      'ar': 'Arabic',
      'ja': 'Japanese',
      'ko': 'Korean',
      'zh': 'Chinese'};
    $rootScope.model = {selectedLocale: 'en'};
    $rootScope.$locale = $locale;
    $rootScope.changeLocale = tmhDynamicLocale.set;
  });

