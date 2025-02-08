import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent {
  email = '';
  password = '';
  private userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.authService.getUserRole().subscribe(user => {
          this.userRole = user.role;
          console.log("User role:", this.userRole);
          this.router.navigate(['/']);
        });
      },
      error: () => alert('Invalid credentials')
    });
  }
}
