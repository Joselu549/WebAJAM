import { Component } from '@angular/core';
import { CarruselComponent } from '../../../carrusel/carrusel.component';

@Component({
  selector: 'app-directores',
  imports: [CarruselComponent],
  templateUrl: './directores.component.html',
  styleUrl: './directores.component.css'
})
export class DirectoresComponent {
  imagesDirector = [
    {
      id: 1,
      src: 'assets/images/director/angel1.jpg',
    },
    {
      id: 2,
      src: 'assets/images/director/angel2.jpg',
    },
    {
      id: 3,
      src: 'assets/images/director/angel3.jpg',
    }
  ]
}
