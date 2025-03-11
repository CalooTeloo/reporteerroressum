import { Injectable } from '@angular/core';
import { ModReport } from '../Models/mod-report.mode';

@Injectable({
  providedIn: 'root'
})
export class ServiceReportService {

  private IReports: ModReport[] = [];

  constructor() {
    this.loadReportsFromLocalStorage();
  }

  saveReport(report: ModReport) {
    this.IReports.push(report);
    this.saveReportsToLocalStorage();
  }

  getlistaReports(): ModReport[] {
    return this.IReports;
  }

  private saveReportsToLocalStorage() {
    localStorage.setItem('reports', JSON.stringify(this.IReports));
  }

  private loadReportsFromLocalStorage() {
    const reports = localStorage.getItem('reports');
    if (reports) {
      this.IReports = JSON.parse(reports);
    }
  }
}