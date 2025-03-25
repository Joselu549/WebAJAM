import { Component, HostListener, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements AfterViewInit, OnDestroy {
  isScrolled = true;
  isSubmenuOpen = false;
  carouselHeight = 0;
  private routerSubscription?: Subscription;

  constructor(private router: Router) {
    // Suscribirse a los cambios de ruta
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Esperar a que el DOM se actualice
      setTimeout(() => this.updateCarouselHeight(), 0);
    });
  }

  toggleSubMenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  @ViewChild('carrusel', { static: false }) carruselRef?: ElementRef;

  ngAfterViewInit() {
    // Inicializar la altura del carrusel
    this.updateCarouselHeight();
  }

  updateCarouselHeight() {
    const carruselElement = document.querySelector('app-carrusel');
    if (carruselElement) {
      this.carouselHeight = carruselElement.getBoundingClientRect().height;
      console.log('Altura actualizada del carrusel:', this.carouselHeight);
      // Si hay carrusel, el estilo depende del scroll
      this.isScrolled = window?.scrollY > (this.carouselHeight - 50);
    } else {
      // Si no hay carrusel, activamos el estilo directamente
      this.carouselHeight = 0;
      this.isScrolled = true;
      console.log('No se encontró el carrusel, activando estilo de la barra');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateCarouselHeight(); // Actualizar altura en cada scroll
  }

  ngOnDestroy() {
    // Limpiar la suscripción cuando el componente se destruye
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
