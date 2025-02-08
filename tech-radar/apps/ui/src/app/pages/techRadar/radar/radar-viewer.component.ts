import { Component, OnInit } from '@angular/core';
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
export class RadarViewerComponent implements OnInit{
  technologies$!: Observable<TechnologyDTO[]>
  constructor(private technologyService: TechnologyService) {}

  ngOnInit(): void {
      this.technologies$ = this.technologyService.getAllTechnologies();
    }

}

