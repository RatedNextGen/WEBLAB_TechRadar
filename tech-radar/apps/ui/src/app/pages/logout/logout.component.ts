import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [CommonModule],
  template: `<p>Logging out...</p>`,
  standalone: true
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => alert('Error logging out')
    });
  }
}
