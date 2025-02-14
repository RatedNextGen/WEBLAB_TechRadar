import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../../../../../shared/src/lib/models/user.model';
import { RouterLink } from '@angular/router';
import { TechnologyListComponent } from './technology-list/technology-list.component';
import { TechnologyCreateComponent } from './technology-create/technology-create.component';
import { RadarComponent } from './radar/radar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TechnologyService } from '../../services/technology.service';
import { TechnologyDTO } from '../../../../../../shared/src/lib/models/technology.model';
import { MatDialog } from '@angular/material/dialog';
import { TechnologyDialogMode, TechnologyDialogComponent } from './technology-dialog/technology-dialog.component';
import { SaveActionType } from '../utils/constants';

@Component({
  selector: 'app-tech-radar',
  imports: [CommonModule, RouterLink, TechnologyListComponent, TechnologyCreateComponent, RadarComponent, NavbarComponent],
  templateUrl: './techRadar.component.html',
  styleUrl: './techRadar.component.scss',
  standalone: true
})
export class TechRadarComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  @ViewChild('technologyList') techList!: TechnologyListComponent;

  protected readonly UserRole = UserRole;
  userRole: UserRole | null = null;


  constructor(private authService: AuthService,
              private technologyService: TechnologyService) {
  }

  ngOnInit(): void {
    this.technologyService.getAllTechnologies().subscribe();
    this.authService.getUserRole().subscribe(user => {
      this.userRole = user.role as UserRole;
    });
  }

  handleTechnologySelected(tech: TechnologyDTO): void {
    if (tech._id) {
      this.techList.scrollToTechnology(tech._id);
    }
  }

  handleNewTechnology(): void {
    const dialogRef = this.dialog.open(TechnologyDialogComponent, {
        width: '400px',
        data: {
          mode: TechnologyDialogMode.CREATE,
          technology: { }
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      const { action, data } = result as { action: SaveActionType, data: TechnologyDTO };
      if (result) {
        if (action === SaveActionType.PUBLISH) {
            this.technologyService.create(data).subscribe();
        }
        if (action === SaveActionType.DRAFT) {
          this.technologyService.createDraft(data).subscribe();
        }
      }
    });
  }
}
