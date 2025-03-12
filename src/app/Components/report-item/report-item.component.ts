import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModReport } from '../../Models/mod-report.mode';
import { CommonModule } from '@angular/common';
import { ServiceReportService } from '../../Services/service-report.service';

@Component({
  selector: 'app-report-item',
  imports: [CommonModule],
  templateUrl: './report-item.component.html',
  styleUrl: './report-item.component.css'

})
export class ReportItemComponent {
  route = inject(Router);
  reportService = inject(ServiceReportService);
  @Input() item!: ModReport;
  @Output() reportDeleted = new EventEmitter<string>(); // Evento para notificar la eliminación


  navigateToID() {
    this.route.navigate(['/report/', this.item.id]);
  }
  
  navigateToEdit() {
    this.route.navigate(['/report/edit/', this.item.id]);
  }

  async deleteReport() {
    const confirm = window.confirm('¿Estás seguro de eliminar este reporte?');
    if (confirm) {
      this.reportService.deleteReport(this.item.id);
      this.reportDeleted.emit(this.item.id);
    }
  }
}
