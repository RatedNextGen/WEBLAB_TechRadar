import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserRole } from '../../../../../../shared/src/lib/models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [
    RouterLink
  ]
})
export class NavbarComponent{
  @Input() userRole: UserRole | null = null;
  @Output() createNewTechnologyClicked = new EventEmitter<void>();

  createNewTechnology() {
    this.createNewTechnologyClicked.emit();
  }
}
