import { Component , HostListener} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  parallaxOffset = 0;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.parallaxOffset = window.pageYOffset * 0.7;
  }
}
