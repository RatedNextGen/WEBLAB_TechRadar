import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  TechnologyCategory,
  TechnologyDTO,
  TechnologyMaturity
} from '../../../../../../../shared/src/lib/models/technology.model';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';

export enum SaveActionType {
  PUBLISH = 'save',
  DRAFT = 'draft',
  CANCEL = 'cancel',
}

export interface TechnologyDialogData {
  technology: TechnologyDTO;
  mode: TechnologyDialogMode;
}

export interface TechnologyDialogResult {
  action: SaveActionType,
  data: TechnologyDTO
}

export enum TechnologyDialogMode {
  CREATE = 'create',
  EDIT = 'edit',
  CHANGE_MATURITY = 'changeMaturity',
}

@Component({
  selector: 'app-technology-edit',
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatFormField, MatSelect, MatOption, ReactiveFormsModule, MatInput, MatTooltip],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }
  ],
  templateUrl: './technology-dialog.component.html',
  styleUrl: './technology-dialog.component.scss',
  standalone: true
})
export class TechnologyDialogComponent {
  protected readonly TechnologyCategory = TechnologyCategory;
  protected readonly TechnologyMaturity = TechnologyMaturity;
  editForm: FormGroup;
  isPublished: boolean = false;
  mode: TechnologyDialogMode;

  constructor(public dialogRef: MatDialogRef<TechnologyDialogComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: TechnologyDialogData) {
    this.mode = data.mode;
    this.isPublished = this.data.technology.published;
    this.editForm = this.initializeForm(data.technology);
  }

  private initializeForm(data: TechnologyDTO) {
    if (this.mode === TechnologyDialogMode.CHANGE_MATURITY) {
      const form = this.fb.group({
        name: [data.name, Validators.required],
        category: [data.category, Validators.required],
        maturity: [data.maturity, Validators.required],
        description: [data.description, Validators.required]
      });
      form.controls['name'].disable();
      form.controls['category'].disable();

      return form;
    }
    if (this.mode === TechnologyDialogMode.EDIT) {
      if (this.isPublished) {
        const form = this.fb.group({
          name: [data.name, Validators.required],
          category: [data.category, Validators.required],
          maturity: [data.maturity, Validators.required],
          description: [data.description, Validators.required]
        });
        form.controls['maturity'].disable();

        return form;
      } else {
        return this.fb.group({
          name: [data.name, Validators.required],
          category: [data.category, Validators.required],
          maturity: [data.maturity],
          description: [data.description]
        });
      }
    }
    return this.fb.group({
      name: ['', Validators.required],
      category: [[], Validators.required],
      maturity: [[], Validators.required],
      description: ['', Validators.required]
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedTech = { ...this.data.technology, ...this.editForm.value };
      this.dialogRef.close({
        action: SaveActionType.PUBLISH,
        data: updatedTech
      });
    }
  }

  onSaveDraft(): void {
    if (this.editForm.valid) {
      const updatedTech = { ...this.data.technology, ...this.editForm.value };
      this.dialogRef.close({
        action: SaveActionType.DRAFT,
        data: updatedTech
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  isDescriptionEmpty(): boolean {
    const value = this.editForm.get('description')?.value;
    return !value || value.trim().length === 0;
  }

  protected readonly TechnologyDialogMode = TechnologyDialogMode;
}
