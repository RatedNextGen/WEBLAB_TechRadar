import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyService } from '../../../services/technology.service';
import {
  TechnologyCategory,
  TechnologyDTO,
  TechnologyMaturity
} from '../../../../../../../shared/src/lib/models/technology.model';
import { Observable } from 'rxjs';
import { RadarComponent } from '../radar/radar.component';
import { map } from 'rxjs/operators';
import { categoryOrder, maturityOrder } from '../../utils/constants';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import {
  TechnologyDialogMode,
  TechnologyDialogComponent,
  TechnologyDialogData, TechnologyDialogResult, SaveActionType
} from '../technology-dialog/technology-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatButton } from '@angular/material/button';

interface GroupedTechnologies {
  category: TechnologyCategory;
  maturities: {
    maturity: TechnologyMaturity;
    items: TechnologyDTO[];
  }[];
}

@Component({
  selector: 'app-technology-list',
  imports: [CommonModule, RadarComponent, MatCard, MatCardHeader, MatCardContent, MatCardFooter, MatChipSet, MatChip, MatButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './technology-list.component.html',
  styleUrl: './technology-list.component.scss',
  standalone: true
})
export class TechnologyListComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  @Input() canAdministrate: boolean = false;
  groupedTechnologies$!: Observable<GroupedTechnologies[]>;

  constructor(private technologyService: TechnologyService) {
  }

  ngOnInit(): void {
    this.groupedTechnologies$ = this.technologyService.technologies$.pipe(
      map((technologies: TechnologyDTO[]) => {

        const categoryGroups: { [key: string]: TechnologyDTO[] } = technologies.reduce((acc, tech) => {
          if (!acc[tech.category]) {
            acc[tech.category] = [];
          }
          acc[tech.category].push(tech);
          return acc;
        }, {} as { [key: string]: TechnologyDTO[] });

        return categoryOrder.map(category => {
          const itemsInCategory = categoryGroups[category] || [];

          const maturityGroups: { [key: string]: TechnologyDTO[] } = itemsInCategory.reduce((acc, tech) => {
            if (!acc[tech.maturity]) {
              acc[tech.maturity] = [];
            }
            acc[tech.maturity].push(tech);
            return acc;
          }, {} as { [key: string]: TechnologyDTO[] });

          const groupedMaturities = maturityOrder
            .map(maturity => ({
              maturity,
              items: maturityGroups[maturity] || []
            }))
            .filter(group => group.items.length > 0);

          return { category, maturities: groupedMaturities };
        });
      })
    );
  }

  onDelete(technology: TechnologyDTO): void {
    if (!technology) {
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent,
      {
        width: '350px',
        data: { message: `Do you really want to delete ${technology.name}?` }
      });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed && technology._id) {
        this.technologyService.deleteTechnology(technology._id).subscribe();
      }
    });
  }

  onEdit(tech: TechnologyDTO) {
    const dialogRef = this.dialog.open(TechnologyDialogComponent, {
        width: '400px',
        data: {
          mode: TechnologyDialogMode.EDIT,
          technology: { ...tech }
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === SaveActionType.PUBLISH || result.action === SaveActionType.DRAFT) {
        this.handleUpdate(result);
      }
    });
  }

  onChangeMaturity(tech: TechnologyDTO) {
    const dialogRef = this.dialog.open(TechnologyDialogComponent, {
        width: '400px',
        data: {
          mode: TechnologyDialogMode.CHANGE_MATURITY,
          technology: { ...tech }
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleUpdate(result);
      }
    });
  }

  scrollToTechnology(techId: string): void {
    const element = document.getElementById(techId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('highlight');
      setTimeout(() => element.classList.remove('highlight'), 2000);
    }
  }

  private handleUpdate(result: TechnologyDialogResult) {
    const { action, data } = result;
    if (result) {
      if (action === SaveActionType.PUBLISH) {
        if (data.published) {
          this.technologyService.update(data).subscribe();
        } else {
          console.log(data);
          this.technologyService.updateDraftAndPublish(data).subscribe();
        }
      }
      if (action === SaveActionType.DRAFT) {
        console.log(data);
        this.technologyService.updateDraft(data).subscribe();
      }
    }
  }
}

