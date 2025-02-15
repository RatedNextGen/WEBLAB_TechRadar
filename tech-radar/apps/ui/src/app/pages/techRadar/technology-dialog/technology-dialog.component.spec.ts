import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  SaveActionType,
  TechnologyDialogComponent,
  TechnologyDialogData,
  TechnologyDialogMode
} from './technology-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TechnologyCategory, TechnologyDTO } from '../../../../../../../shared/src/lib/models/technology.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TechnologyDialogComponent', () => {
  let component: TechnologyDialogComponent;
  let fixture: ComponentFixture<TechnologyDialogComponent>;
  let dialogRefMock: Partial<MatDialogRef<TechnologyDialogComponent>>;


  const draftTech: TechnologyDTO = {
    _id: '2',
    name: 'Draft Tech',
    category: TechnologyCategory.Tools,
    // @ts-ignore
    maturity: '',
    description: '',
    published: false,
    publishedAt: null,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  };

  const draftDialogData: TechnologyDialogData = {
    technology: draftTech,
    mode: TechnologyDialogMode.CREATE
  };

  beforeEach(async () => {
    dialogRefMock = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [TechnologyDialogComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: draftDialogData },
        { provide: MatDialogRef, useValue: dialogRefMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component in draft mode', () => {
    expect(component).toBeTruthy();
    expect(component.mode).toBe(TechnologyDialogMode.CREATE);
    expect(component.form.get('maturity')?.value).toBeNull();
  });

  it('should consider draft valid when name and category are valid', () => {
    component.form.patchValue({
      name: 'Draft Tech Updated',
      category: draftTech.category,
      maturity: '',
      description: ''
    });
    expect(component.isDraftValid).toBe(true);
  });

  it('should call dialogRef.close with DRAFT action on onSaveDraft', () => {
    component.form.patchValue({
      name: 'Draft Tech Updated',
      category: draftTech.category,
      maturity: '',
      description: ''
    });
    component.onSaveDraft();
    expect(dialogRefMock.close).toHaveBeenCalledWith({
      action: SaveActionType.DRAFT,
      data: { ...draftTech, name: 'Draft Tech Updated', category: draftTech.category, maturity: '', description: '' }
    });
  });
});
