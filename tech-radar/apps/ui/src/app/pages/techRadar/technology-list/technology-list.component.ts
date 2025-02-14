import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit, signal } from '@angular/core';
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
  SaveActionType,
  TechnologyDialogComponent,
  TechnologyDialogMode,
  TechnologyDialogResult
} from '../technology-dialog/technology-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDivider } from '@angular/material/divider';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';

interface GroupedTechnologies {
  category: TechnologyCategory;
  maturities: Maturities[];
}

interface Maturities {
  maturity: TechnologyMaturity | string;
  items: TechnologyDTO[];
}

@Component({
  selector: 'app-technology-list',
  imports: [CommonModule, RadarComponent, MatCard, MatCardHeader, MatCardContent, MatCardFooter, MatChipSet, MatChip, MatButton, MatExpansionModule, MatDivider, MatGridList, MatGridTile],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './technology-list.component.html',
  styleUrl: './technology-list.component.scss',
  standalone: true
})
export class TechnologyListComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  @Input() canAdministrate: boolean = false;
  readonly panelOpenState = signal(false);
  groupedTechnologies$!: Observable<GroupedTechnologies[]>;

  constructor(private technologyService: TechnologyService) {
  }

  ngOnInit(): void {
    this.groupedTechnologies$ = this.technologyService.technologies$.pipe(
      map((technologies: TechnologyDTO[]) => {
        // Gruppiere alle Technologien nach Kategorie
        const categoryGroups = this.groupByCategory(technologies);

        // Für jede Kategorie: Gruppiere nach Maturity, inklusive eines Default-Werts
        return categoryOrder.map(category => {
          const itemsInCategory = categoryGroups[category] || [];
          const groupedMaturities = this.groupByMaturity(itemsInCategory, 'UNCATEGORIZED');
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
      this.handleUpdate(result);
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
      setTimeout(() => element.classList.remove('highlight'), 1000);
    }
  }

  private handleUpdate(result: TechnologyDialogResult) {
    if (!result) {
      return;
    }
    const { action, data } = result;
    if (result) {
      if (action === SaveActionType.PUBLISH) {
        if (data.published) {
          this.technologyService.update(data).subscribe();
        } else {
          this.technologyService.updateDraftAndPublish(data).subscribe();
        }
      }
      if (action === SaveActionType.DRAFT) {
        console.log(data);
        this.technologyService.updateDraft(data).subscribe();
      }
    }
  }

  private groupByCategory(technologies: TechnologyDTO[]): { [category: string]: TechnologyDTO[] } {
    return technologies.reduce((acc, tech) => {
      const category = tech.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(tech);
      return acc;
    }, {} as Record<string, TechnologyDTO[]>);
  }

  private groupByMaturity(items: TechnologyDTO[], defaultMaturity: string): Maturities[] {
    const maturityGroups = items.reduce((acc, tech) => {
      const key = tech.maturity ? tech.maturity : defaultMaturity;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(tech);
      return acc;
    }, {} as Record<string, TechnologyDTO[]>);

    const extendedMaturityOrder = [...maturityOrder, defaultMaturity];

    return extendedMaturityOrder
      .map(maturityKey => ({
        maturity: maturityKey,
        items: maturityGroups[maturityKey] || []
      }))
      .filter(group => group.items.length > 0);
  }
}

