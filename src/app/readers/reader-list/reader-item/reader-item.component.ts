import { Component, Input } from '@angular/core';
import { Reader } from '../../reader.model';

@Component({
  selector: 'app-reader-item',
  templateUrl: './reader-item.component.html',
  styleUrls: ['./reader-item.component.css'],
})
export class ReaderItemComponent {
  @Input() reader: Reader;
  @Input() index: number;
}
