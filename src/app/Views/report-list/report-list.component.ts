import { Component } from '@angular/core';
import { ModReport } from '../../Models/mod-report.mode';
import { ServiceReportService } from '../../Services/service-report.service';
import { ReportItemComponent } from '../../Components/report-item/report-item.component'; // Asegúrate de importar el componente
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-report-list',
  imports: [ReportItemComponent, NgFor, FormsModule],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css'
})
export class ReportListComponent {
  reports: ModReport[] = [];
  searchTerm: string = '';
  statusFilter: string = 'all';

  constructor(private reportService: ServiceReportService) {
    this.loadReports();
  }

  private loadReports() {
    this.reports = this.reportService.getlistaReports();
  }

  onReportDeleted(id: string) {
    this.reports = this.reports.filter(report => report.id !== id); // Actualizar la lista de reportes
  }


  get filteredReports(): ModReport[] {
    return this.reports.filter(report => {
      const matchesSearch = report.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.statusFilter === 'all' ||
        report.estado.toString() === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

}