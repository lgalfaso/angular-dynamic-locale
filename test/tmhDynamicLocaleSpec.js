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

  it('should trigger an even when there it changes the locale', inject(function($locale, tmhDynamicLocale, $rootScope) {
    var callback = jasmine.createSpy();

    runs(function() {
      $rootScope.$on('$localeChangeSuccess', callback);
      tmhDynamicLocale.set('es');
    });
    waitsFor(function() {
      return $locale.id === 'es';
    }, 'locale not updated', 2000);
    runs(function() {
      expect(callback.calls.length).toBe(1);
      expect(callback.calls[0].args[1]).toEqual('es');
      expect(callback.calls[0].args[2]).toEqual($locale);
    });
  }))
});
