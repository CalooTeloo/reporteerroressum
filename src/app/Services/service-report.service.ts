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

  getlistaReports(): ModReport[] {
    return this.IReports;
  }

  getReportsById(id: string): ModReport | undefined {
    for (let i = 0; i < this.IReports.length; i++) {
      if (this.IReports[i].id === id) {
        return this.IReports[i];
      }
    }
    return undefined;
  }

  saveReport(report: ModReport) {
    this.IReports.push(report);
    this.saveReportsToLocalStorage();
  }

  deleteReport(id: string) {
    this.IReports = this.IReports.filter(report => report.id !== id);
    this.saveReportsToLocalStorage();
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
  updateReport(updatedReport: ModReport) {
    const index = this.IReports.findIndex(r => r.id === updatedReport.id);
    if (index !== -1) {
      const original = this.IReports[index];
      const changes = this.detectChanges(original, updatedReport);

      updatedReport.changeHistory = [
        ...(original.changeHistory || []),
        { date: new Date().toISOString(), changes }
      ];

      this.IReports[index] = updatedReport;
      this.saveReportsToLocalStorage();
    }
  }

  private detectChanges(original: ModReport, updated: ModReport): string[] {
    const changes: string[] = [];
    const fields: (keyof ModReport)[] = ['name', 'description', 'estado', 'img'];

    fields.forEach(field => {
      if (original[field] !== updated[field]) {
        changes.push(`${this.fieldName(field)} cambiado de "${original[field]}" a "${updated[field]}"`);
      }
    });

    return changes;
  }

  private fieldName(field: string): string {
    const names: { [key: string]: string } = {
      name: 'Nombre',
      description: 'Descripción',
      estado: 'Estado',
      img: 'Imagen'
    };
    return names[field] || field;
  }
}