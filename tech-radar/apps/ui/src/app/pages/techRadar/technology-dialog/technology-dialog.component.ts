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
import { SaveActionType, TechnologyDialogData, TechnologyDialogMode } from './technology-dialog.types';


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
  protected readonly TechnologyDialogMode = TechnologyDialogMode;
  form: FormGroup;
  isPublished: boolean = false;
  mode: TechnologyDialogMode;

  constructor(public dialogRef: MatDialogRef<TechnologyDialogComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: TechnologyDialogData) {
    this.mode = data.mode;
    this.isPublished = this.data.technology.published;
    this.form = this.initializeForm(data.technology);
  }

  get title(): string {
    switch (this.mode) {
      case TechnologyDialogMode.CREATE:
        return 'Create Technology';
      case TechnologyDialogMode.EDIT:
        return 'Edit Technology';
      case TechnologyDialogMode.CHANGE_MATURITY:
        return 'Change Maturity';
      default:
        return '';
    }
  }

  get isDraftValid(): boolean {
    return !this.isPublished && <boolean>this.form.get('name')?.valid && <boolean>this.form.get('category')?.valid;
  }

  onSave(): void {
    if (this.form.valid) {
      const updatedTech = { ...this.data.technology, ...this.form.value };
      this.dialogRef.close({
        action: SaveActionType.PUBLISH,
        data: updatedTech
      });
    }
  }

  onSaveDraft(): void {
    if (this.isDraftValid) {
      const updatedTech = { ...this.data.technology, ...this.form.value };
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
    const value = this.form.get('description')?.value;
    return !value || value.trim().length === 0;
  }

  private initializeForm(data: TechnologyDTO) {
    if (this.mode === TechnologyDialogMode.CHANGE_MATURITY) {
      console.log('create maturity form');
      return this.createChangeMaturityForm(data);
    }
    if (this.mode === TechnologyDialogMode.EDIT) {
      if (this.isPublished) {
        console.log('create published form');
        return this.createFormForPublished(data);
      } else {
        console.log('create draft form');
        return this.createDraftForm(data);
      }
    }
    console.log('create empty form');
    return this.createEmptyForm();
  }


  private createEmptyForm() {
    return this.fb.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      maturity: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  private createFormForPublished(data: TechnologyDTO) {
    const form = this.fb.group({
      name: [data.name, Validators.required],
      category: [data.category, Validators.required],
      maturity: [data.maturity, Validators.required],
      description: [data.description, Validators.required]
    });
    form.controls['maturity'].disable();

    return form;
  }

  private createChangeMaturityForm(data: TechnologyDTO) {
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

  private createDraftForm(data: TechnologyDTO) {
    return this.fb.group({
      name: [data.name, Validators.required],
      category: [data.category, Validators.required],
      maturity: [data.maturity],
      description: [data.description]
    });
  }
}
