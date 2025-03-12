import { Component, ViewChild } from '@angular/core';
import { CamaraComponent } from '../../Camera/camara/camara.component';
import { ModReport } from '../../Models/mod-report.mode';
import { ServiceReportService } from '../../Services/service-report.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-report-add',
  imports: [CamaraComponent, FormsModule, NgIf],
  templateUrl: './report-add.component.html',
  styleUrls: ['./report-add.component.css'],
  standalone: true,
})
export class ReportAddComponent {
  @ViewChild('reportForm') reportForm!: NgForm;
  @ViewChild(CamaraComponent) cameraComponent!: CamaraComponent;


  report: ModReport = {
    id: '',
    name: '',
    description: '',
    img: '',
    date: '',
    estado: true,
  };
  imgUrl: string = '';
  isEditMode: boolean = false;

  constructor(private reportService: ServiceReportService) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newReport: ModReport = {
        ...this.report,
        img: this.imgUrl,
        date: new Date().toISOString()
      };
      // Normalizar el ID antes de guardar
      this.report.id = this.report.id.trim().toUpperCase();
      this.reportService.saveReport(newReport);
      this.resetForm();
    }
  }

  private resetForm() {
    this.report = {
      id: '',
      name: '',
      description: '',
      img: '',
      date: '',
      estado: true,
    };
    this.imgUrl = '';
    this.reportForm.resetForm();
    // Resetear el componente de cámara si existe
    if (this.cameraComponent) {
      this.cameraComponent.resetState(); // Asegurar que el método sea público
    }
  }
}