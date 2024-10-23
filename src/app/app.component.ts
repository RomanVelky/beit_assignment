import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarTableComponent } from './car-table/car-table.component';
import { CarDetailComponent } from './car-detail/car-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarTableComponent, CarDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'beit_assignment';
}
