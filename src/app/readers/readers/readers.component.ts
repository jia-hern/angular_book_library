import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-readers',
  templateUrl: './readers.component.html',
  styleUrls: ['./readers.component.css'],
})
export class ReadersComponent implements OnInit {
  constructor(private loggingService: LoggingService) {}

  ngOnInit() {
    this.loggingService.printLog('ReadersComponent initialized');
  }
}
