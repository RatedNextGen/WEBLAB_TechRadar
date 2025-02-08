import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyService } from '../../../services/technology.service';
import { TechnologyDTO } from '../../../../../../../shared/src/lib/models/technology.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-radar-viewer',
  imports: [CommonModule],
  templateUrl: './radar-viewer.component.html',
  styleUrl: './radar-viewer.component.scss',
  standalone: true
})
export class RadarViewerComponent implements OnInit {
  @Input() canAdministrate: boolean = false;
  technologies$!: Observable<TechnologyDTO[]>;

  constructor(private technologyService: TechnologyService) {
  }

  ngOnInit(): void {
    this.technologyService.getAllTechnologies().subscribe();
    this.technologies$ = this.technologyService.technologies$;
  }

  onDelete(technologyId: string | undefined) {
    if (technologyId) {
      this.technologyService.deleteTechnology(technologyId).subscribe();
    }
  }

}

