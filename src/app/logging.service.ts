import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LoggingService {
  printLog(newLog: string) {
    if (environment.ENABLE_LOGGING_SERVICE)
      console.log('LoggingService: ', newLog);
  }
}
