import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DirectoresComponent } from './pages/about/directores/directores.component';
import { HistoriaComponent } from './pages/about/historia/historia.component';
import { BandaJuvenilComponent } from './pages/about/banda-juvenil/banda-juvenil.component';
import { ConciertosComponent } from './pages/conciertos/conciertos.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sobre-nosotros', component: AboutComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'directores', component: DirectoresComponent},
  {path: 'historia', component: HistoriaComponent},
  {path: 'banda-juvenil', component: BandaJuvenilComponent},
  {path: 'conciertos', component: ConciertosComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
