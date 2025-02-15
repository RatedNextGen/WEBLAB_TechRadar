import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ConfirmDeleteDialogComponent', () => {
  let component: ConfirmDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteDialogComponent>;
  let dialogRefMock: Partial<MatDialogRef<ConfirmDeleteDialogComponent>>;

  beforeEach(async () => {
    dialogRefMock = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { message: 'Do you really want to delete this item?' } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call dialogRef.close() with true when onConfirm is called', () => {
    component.onConfirm();
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('should call dialogRef.close with false when onCancel is called', () => {
    component.onCancel();
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });
});
