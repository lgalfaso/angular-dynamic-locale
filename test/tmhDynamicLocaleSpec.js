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
      expect(callback.calls.length).toBe(0);
    });
    waitsFor(function() {
      return $locale.id === 'es';
    }, 'locale not updated', 2000);
    runs(function() {
      expect(callback.calls.length).toBe(1);
      expect(callback.calls[0].args[1]).toEqual('es');
      expect(callback.calls[0].args[2]).toEqual($locale);
      tmhDynamicLocale.set('en-us');
    });
    waitsFor(function() {
      return $locale.id === 'en-us';
    }, 'locale not reverted', 2000);
  }));

  it('should change the already formatted numbers in the page', inject(function($locale, tmhDynamicLocale, $rootScope, $compile) {
    var element = null;

    runs(function() {
      element = $compile('<span>{{val | number}}</span>')($rootScope);

      $rootScope.val = 1234.5678;
      $rootScope.$apply();
      expect(element.text()).toBe('1,234.568');

      tmhDynamicLocale.set('es');
    });
    waitsFor(function() {
      return $locale.id === 'es';
    }, 'locale not updated', 2000);
    runs(function() {
      expect(element.text()).toBe('1.234,568');

      tmhDynamicLocale.set('en-us');
    });
    waitsFor(function() {
      return $locale.id === 'en-us';
    }, 'locale not reverted', 2000);
  }));
});
