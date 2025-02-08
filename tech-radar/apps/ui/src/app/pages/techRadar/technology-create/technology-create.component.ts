import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TechnologyService } from '../../../services/technology.service';

@Component({
  selector: 'app-technology-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './technology-create.component.html',
  styleUrl: './technology-create.component.scss',
  standalone: true
})
export class TechnologyCreateComponent {
  technologyForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private technologyService: TechnologyService) {
    this.technologyForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(3)]],
      maturity: ['', Validators.required]
    });
  }

  onCreateAndPublish(): void {
    console.log(this.technologyForm.value);
    if (this.technologyForm.valid) {
      this.technologyService.createAndPublishTechnology(this.technologyForm.value).subscribe({
        next: () => {
          this.successMessage = 'Technology created successfully!';
          this.technologyForm.reset();
        },
        error: (error) => {
          this.errorMessage = 'Failed to create technology.';
          console.error(error);
        }
      });
    }
  }

  onCreateAndDraft(): void {
    if (this.technologyForm.valid) {
      this.technologyService.createDraftTechnology(this.technologyForm.value).subscribe({
        next: () => {
          this.successMessage = 'Technology created successfully!';
          this.technologyForm.reset();
        },
        error: (error) => {
          this.errorMessage = 'Failed to create technology.';
          console.error(error);
        }
      });
    }
  }
}
