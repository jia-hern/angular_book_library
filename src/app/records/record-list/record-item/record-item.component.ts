import { Component, Input } from '@angular/core';
import { Record } from '../../record.model';

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.css'],
})
export class RecordItemComponent {
  @Input() record: Record;
  @Input() index: number;
}
