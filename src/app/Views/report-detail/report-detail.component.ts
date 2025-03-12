import { Component, inject } from '@angular/core';
import { ModReport } from '../../Models/mod-report.mode';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceReportService } from '../../Services/service-report.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-report-detail',
  imports: [NgIf, CommonModule],
  templateUrl: './report-detail.component.html',
  styleUrl: './report-detail.component.css'
})
export class ReportDetailComponent {

  Reportselected!: ModReport;
  private route = inject(Router);
  private Aroute = inject(ActivatedRoute);
  private reportServices = inject(ServiceReportService);

  constructor() {

    this.Aroute.params.subscribe(params => {
      const id = params['id'];

      const report = this.reportServices.getReportsById(String(id));
      console.log(report);

      if (!report) {
        console.log('Report Not Found');
        this.route.navigate(['not-found', id]);
      } else {
        this.Reportselected = report;
      }
    });
  }

  gotoHome(): void {
    this.route.navigate(['report-list']);
  }

  gotoEdit(): void {
    this.route.navigate(['/edit', this.Reportselected.id]);
  }

}
