'use strict';

describe('dynamicLocale', function() {
  beforeEach(module('tmh.dynamicLocale'));
  beforeEach(module(function(tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('/base/components/angular-i18n/angular-locale_{{locale}}.js');
  }));

  it('should (eventually) be able to change the locale', inject(function($locale, tmhDynamicLocale) {
    runs(function() {
      tmhDynamicLocale.set('es');
    });

    waitsFor(function() {
      return $locale.id === 'es';
    }, 'locale not updated', 2000);

    runs(function() {
      expect($locale.id).toBe('es');
      expect($locale.DATETIME_FORMATS.DAY["0"]).toBe("domingo");
      tmhDynamicLocale.set('en-us');
    });

    waitsFor(function() {
      return $locale.id === 'en-us';
    }, 'locale not reverted', 2000);
  }));
});
