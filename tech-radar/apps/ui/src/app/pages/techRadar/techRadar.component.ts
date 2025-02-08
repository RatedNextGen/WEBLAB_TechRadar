import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../../../../../shared/src/lib/models/user.model';

@Component({
  selector: 'app-tech-radar',
  imports: [CommonModule],
  templateUrl: './techRadar.component.html',
  styleUrl: './techRadar.component.scss',
  standalone: true
})
export class TechRadarComponent implements OnInit {

  userRole: UserRole | null = null;


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserRole().subscribe(user => {
      this.userRole = user.role as UserRole;
    });
  }

  protected readonly UserRole = UserRole;
}
