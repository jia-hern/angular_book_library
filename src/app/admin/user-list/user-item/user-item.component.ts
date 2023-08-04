import { Component, Input } from '@angular/core';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent {
  @Input() user: User;
  @Input() index: number;
}
