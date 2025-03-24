import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-carrusel',
  imports: [],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.css'
})
export class CarruselComponent implements OnInit, OnDestroy {
  private intervalId?: number;
  currentImageIndex = 0;
  prevImageId = 0;
  images = [
    {
      id: 1,
      src: 'assets/images/fondo_inicio.jpg',
      active: true
    },
    {
      id: 2,
      src: 'assets/images/fondo_inicio2.jpg',
      active: false
    },
    {
      id: 3,
      src: 'assets/images/fondo_inicio3.jpg',
      active: false
    },
    {
      id: 4,
      src: 'assets/images/fondo_inicio4.jpg',
      active: false
    },
  ]

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }

  startCarousel() {
    this.intervalId = window.setInterval(() => {
      this.nextImage();
    }, 10000); // 10 segundos
  }

  nextImage() {
    // Guardar el ID de la imagen actual como previa
    this.prevImageId = this.images[this.currentImageIndex].id;
    
    // Desactivar la imagen actual
    this.images[this.currentImageIndex].active = false;
    
    // Avanzar al siguiente índice
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    
    // Activar la nueva imagen
    this.images[this.currentImageIndex].active = true;
  }
}
