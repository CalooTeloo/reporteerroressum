import { Component } from '@angular/core';
import { CamaraComponent } from '../../Camera/camara/camara.component';
import { ModReport } from '../../Models/mod-report.mode';
import { ServiceReportService } from '../../Services/service-report.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report-add',
  imports: [CamaraComponent, FormsModule],
  templateUrl: './report-add.component.html',
  styleUrls: ['./report-add.component.css'],
  standalone: true,
})
export class ReportAddComponent {
  report: ModReport = {
    id: '',
    name: '',
    description: '',
    img: '',
    date: '',
    estado: true,
  };
  imgUrl: string = 'imageCaptured';

  constructor(private reportService: ServiceReportService) { }

  onSubmit(event: Event) {
    event.preventDefault();
    this.report.img = this.imgUrl;
    this.report.date = new Date().toISOString();
    this.reportService.saveReport(this.report);
    console.log('Reporte guardado', this.report);
    this.resetForm();
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
  }
}