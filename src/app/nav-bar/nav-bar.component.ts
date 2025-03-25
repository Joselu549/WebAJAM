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
      // Si hay carrusel, el estilo depende del scroll
      // Solo aplicar el efecto de scroll si el carrusel está en el top
      const top = carruselElement.getBoundingClientRect().top;
      if (top === 0) {
        this.isScrolled = window?.scrollY > (this.carouselHeight - 50);
      } else {
        this.isScrolled = true;
      }
    } else {
      // Si no hay carrusel, activamos el estilo directamente
      this.carouselHeight = 0;
      this.isScrolled = true;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateCarouselHeight(); // Actualizar altura en cada scroll
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.updateCarouselHeight(); // Actualizar altura en cada resize
  }
  
  ngOnDestroy() {
    // Limpiar la suscripción cuando el componente se destruye
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
