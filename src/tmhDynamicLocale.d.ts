// Type definitions for tmhDynamicLocale
// Project: http://angularjs.org
// Definitions by: Gerardo Lima <https://github.com/gerardolima>
// Definitions: https://github.com/lgalfaso/angular-dynamic-locale
// TypeScript Version: 2.4.1

import * as ng from 'angular';

export as namespace tmh;

declare namespace tmh
{
    interface IDynamicLocale
    {
        set(locale: string): ng.IPromise<ng.ILocaleService>;
        get(): string;
    }
}