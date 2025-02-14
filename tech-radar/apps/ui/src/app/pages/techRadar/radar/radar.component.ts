import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import {
  TechnologyCategory,
  TechnologyDTO,
  TechnologyMaturity
} from '../../../../../../../shared/src/lib/models/technology.model';
import { Observable } from 'rxjs';
import { TechnologyService } from '../../../services/technology.service';
import { categoryOrder, maturityOrder } from '../../utils/constants';

@Component({
  selector: 'app-radar',
  imports: [CommonModule],
  templateUrl: './radar.component.html',
  styleUrl: './radar.component.scss',
  standalone: true
})
export class RadarComponent implements OnInit {
  @ViewChild('radarChart', { static: true }) private chartContainer!: ElementRef;
  @Output() technologySelected = new EventEmitter<TechnologyDTO>();
  technologies$!: Observable<TechnologyDTO[]>;

  private svg: any;
  private width = 800;
  private height = 800;
  private margin = 20;
  private radius!: number;
  private itemsGroup: any;

  constructor(private technologyService: TechnologyService) { }

  ngOnInit(): void {
    this.radius = Math.min(this.width, this.height) / 2 - this.margin;
    this.createSvg();
    this.drawRadar();
    this.itemsGroup = this.svg.append('g').attr('class', 'items-group');


    this.technologies$ = this.technologyService.technologies$;
    this.technologies$.subscribe((technologies: TechnologyDTO[]) => {
      this.updateItems(technologies);
    });
  }

  private createSvg(): void {
    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')');
  }

  private drawRadar(): void {
    const levels = Object.values(TechnologyMaturity).length;
    const numAxes = Object.values(TechnologyCategory).length;

    for (let level = 0; level < levels; level++) {
      this.svg.append('circle')
        .attr('r', (this.radius / levels) * (level + 1))
        .attr('fill', 'none')
        .attr('stroke', '#fff');
    }

    for (let i = 0; i < numAxes; i++) {
      const angle = (Math.PI * 2 / numAxes) * i;
      this.svg.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', this.radius * Math.cos(angle))
        .attr('y2', this.radius * Math.sin(angle))
        .attr('stroke', '#fff');
    }

    for (let level = 0; level < levels; level++) {
      const r = (this.radius / levels) * (level + 1);
      this.svg.append('text')
        .attr('x', 0)
        .attr('y', -r)
        .attr('dy', '4em')
        .attr('dx', '2em')
        .attr('text-anchor', 'middle')
        .attr('font-size', '18px')
        .attr('fill', '#fff')
        .text(this.getMaturityLabel(level));
    }

    const labelOffset = 80;
    categoryOrder.forEach((cat, i) => {
      const angle = (Math.PI * 2 / categoryOrder.length) * i + (Math.PI * 2 / categoryOrder.length) / 2;
      const x = (this.radius + labelOffset) * Math.cos(angle);
      const y = (this.radius + labelOffset) * Math.sin(angle);

      this.svg.append('text')
        .attr('x', x)
        .attr('y', y)
        .attr('text-anchor', 'middle')
        .attr('fill', '#fff')
        .attr('font-size', '14px')
        .text(cat);
    });
  }

  private updateItems(items: TechnologyDTO[]): void {
    this.itemsGroup.selectAll('*').remove();
    this.drawItems(items);
  }

  private drawItems(items: TechnologyDTO[]): void {
    const ringThickness = this.radius / maturityOrder.length;

    items.forEach(item => {
      const maturityIndex = maturityOrder.indexOf(item.maturity);
      if (maturityIndex < 0) { return; }
      const innerRadius = maturityIndex * ringThickness;
      const outerRadius = (maturityIndex + 1) * ringThickness;
      const generatedLocation = innerRadius + Math.random() * (outerRadius - innerRadius);

      const categoryIndex = categoryOrder.indexOf(item.category);
      if (categoryIndex < 0) { return; }
      const angleSector = (2 * Math.PI) / categoryOrder.length;
      const startAngle = categoryIndex * angleSector;
      const angle = startAngle + Math.random() * angleSector;

      const x = generatedLocation * Math.cos(angle);
      const y = generatedLocation * Math.sin(angle);

      this.itemsGroup.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 10)
        .attr('fill', this.getColourByMaturity(item))
        .attr('stroke', '#fff')
        .attr('stroke-width', 1)
        .on('mouseover', () => {
          this.technologySelected.emit(item);
        })

      this.itemsGroup.append('text')
        .attr('x', x + 12)
        .attr('y', y)
        .attr('fill', '#fff')
        .attr('font-size', '10px')
        .text(item.name);
    });
  }

  private getMaturityLabel(level: number): string {
    switch (level) {
      case 0:
        return TechnologyMaturity.Adopt
      case 1:
        return TechnologyMaturity.Assess
      case 2:
        return TechnologyMaturity.Hold
      case 3:
        return TechnologyMaturity.Trial
      default:
        return '';
    }
  }

  private getColourByMaturity(item: TechnologyDTO): string {
    switch (item.maturity) {
      case TechnologyMaturity.Adopt:
        return '#007991';
      case TechnologyMaturity.Assess:
        return '#439A86';
      case TechnologyMaturity.Hold:
        return '#BCD8C1';
      case TechnologyMaturity.Trial:
        return '#E9D985';
    }
  }
}
