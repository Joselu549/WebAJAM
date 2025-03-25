import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HistoriaComponent } from './pages/about/historia/historia.component';
import { DirectoresComponent } from './pages/about/directores/directores.component';
import { BandaJuvenilComponent } from './pages/about/banda-juvenil/banda-juvenil.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', children: [
    { path: 'historia', component: HistoriaComponent },
    { path: 'directores', component: DirectoresComponent },
    { path: 'banda-juvenil', component: BandaJuvenilComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
