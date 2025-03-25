import { Component } from '@angular/core';
import { CarruselComponent } from '../../carrusel/carrusel.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CarruselComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  carouselImages = [
    {
      id: 1,
      src: 'assets/images/bg/fondo_inicio.jpg'
    },
    {
      id: 2,
      src: 'assets/images/bg/fondo_inicio2.jpg'
    },
    {
      id: 3,
      src: 'assets/images/bg/fondo_inicio3.jpg'
    },
    {
      id: 4,
      src: 'assets/images/bg/fondo_inicio4.jpg'
    },
  ];
}
