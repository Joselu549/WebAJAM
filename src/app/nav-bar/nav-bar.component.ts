import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isScrolled = false

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 1000; // Cambia cuando el scroll pasa los 100px
  }
}
