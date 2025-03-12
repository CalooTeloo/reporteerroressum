import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CameraService } from '../../camera/services/camera.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-camara',
  imports: [NgIf],
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.css']
})
export class CamaraComponent {
  cameraService: CameraService = inject(CameraService);
  imgUrl: string = '';
  errorMessage: string = '';
  loading: boolean = false;
  @Output() imageCaptured = new EventEmitter<string>(); // Asegúrate de que sea de tipo string
  @Input() initialImage: string = '';


  ngOnInit() {
    if (this.initialImage) {
      this.imgUrl = this.initialImage;
    }
  }

  async takePicture() {
    this.resetState(); // Limpiar el estado antes de tomar la foto

    try {
      this.loading = true;
      this.imgUrl = await this.cameraService.takePicture();

      if (!this.imgUrl) {
        throw new Error('No se obtuvo una imagen válida');
      }

      // Emitir la URL de la imagen capturada
      this.imageCaptured.emit(this.imgUrl);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.loading = false;
    }
  }

  resetState() {
    this.errorMessage = '';
    this.imgUrl = '';
    this.imageCaptured.emit(''); // Emitir cadena vacía para limpiar en el padre
  }

  private handleError(error: any) {
    console.error('Error al capturar imagen:', error);
    this.errorMessage = String(error);
  }
}