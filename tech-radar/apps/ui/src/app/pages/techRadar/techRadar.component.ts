import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../../../../../shared/src/lib/models/user.model';
import { RouterLink } from '@angular/router';
import { RadarViewerComponent } from './radar/radar-viewer.component';
import { TechnologyCreateComponent } from './technology-create/technology-create.component';

@Component({
  selector: 'app-tech-radar',
  imports: [CommonModule, RouterLink, RadarViewerComponent, TechnologyCreateComponent],
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
