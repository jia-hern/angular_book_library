import { Component, OnInit } from '@angular/core';
import { LoggingService } from 'src/app/logging.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  constructor(private loggingService: LoggingService){}
  
  ngOnInit() {
      this.loggingService.printLog('BooksComponent initialized');
  }
}
