import { Component, ViewChild } from '@angular/core';
import { ModReport } from '../../Models/mod-report.mode';
import { ServiceReportService } from '../../Services/service-report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CamaraComponent } from '../../Camera/camara/camara.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-report-edit',
  imports: [CamaraComponent,NgIf,FormsModule],
  templateUrl: './report-edit.component.html',
  styleUrl: './report-edit.component.css'
})
export class ReportEditComponent {
  @ViewChild('editForm') editForm!: NgForm;
  @ViewChild(CamaraComponent) cameraComponent!: CamaraComponent;
  report!: ModReport;
  originalImg: string = '';

  constructor(
    private service: ServiceReportService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const original = this.service.getReportsById(id!);

    if (original) {
      this.report = { ...original };
      this.originalImg = original.img;
    } else {
      this.router.navigate(['/not-found']);
    }
  }

  updateImage(newImg: string) {
    this.report.img = newImg;
  }

  onSubmit() {
    this.service.updateReport(this.report);
    this.router.navigate(['/report', this.report.id]);
  }
}
