// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { LOCAL_SERVER_BASE_PATH } from './environment-constants';
import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
  production: false,
  basePath: LOCAL_SERVER_BASE_PATH,
  loggerConfig: {
    level: NgxLoggerLevel.TRACE,
    serverLogLevel: NgxLoggerLevel.TRACE,
    serverLoggingUrl: `${ LOCAL_SERVER_BASE_PATH }/ui_logger`,
    disableConsoleLogging: false,
    enableSourceMaps: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
