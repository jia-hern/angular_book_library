import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
})
export class RecordsComponent implements OnInit {
  constructor(private loggingService: LoggingService) {}
  ngOnInit() {
    this.loggingService.printLog('RecordsComponent initialized');
  }
}
