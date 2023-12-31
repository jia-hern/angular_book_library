import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private loggingService: LoggingService) {}
  ngOnInit() {
    this.loggingService.printLog('AdminComponent initialized');
  }
}
