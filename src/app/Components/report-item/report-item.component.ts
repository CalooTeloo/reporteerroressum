import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModReport } from '../../Models/mod-report.mode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-item',
  imports: [CommonModule],
  templateUrl: './report-item.component.html',
  styleUrl: './report-item.component.css'

})
export class ReportItemComponent {
  route = inject(Router);
  @Input() item!: ModReport;

  navigateToID() {
    this.route.navigate(['/report/', this.item.id]);
  }
}
