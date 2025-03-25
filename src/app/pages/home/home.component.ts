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

}
