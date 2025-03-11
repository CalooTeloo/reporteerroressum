import { Component } from '@angular/core';
import { ModReport } from '../../Models/mod-report.mode';
import { ServiceReportService } from '../../Services/service-report.service';
import { ReportItemComponent } from '../../Components/report-item/report-item.component'; // Asegúrate de importar el componente
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-report-list',
  imports: [ReportItemComponent,NgFor],
  templateUrl: './report-list.component.html',
  styleUrl: './report-list.component.css'
})
export class ReportListComponent {
  reports: ModReport[] = [];

  constructor(private reportService: ServiceReportService) {
    this.loadReports();
  }

  private loadReports() {
    this.reports = this.reportService.getlistaReports();
  }
}