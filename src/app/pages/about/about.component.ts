import { Component } from '@angular/core';
import { DirectoresComponent } from './directores/directores.component';
import { HistoriaComponent } from './historia/historia.component';
import { BandaJuvenilComponent } from './banda-juvenil/banda-juvenil.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-about',
  imports: [DirectoresComponent, HistoriaComponent, BandaJuvenilComponent, FooterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
