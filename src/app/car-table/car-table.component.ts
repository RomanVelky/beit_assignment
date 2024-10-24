import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';
import { CarDetailComponent } from '../car-detail/car-detail.component';
import { CardModule } from 'primeng/card';
import { Sidebar } from 'primeng/sidebar';

type Column = {
  field: string;
  header: string;
};

@Component({
  selector: 'app-car-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    SidebarModule,
    CardModule,
    CarDetailComponent,
  ],
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.scss'],
})
export class CarTableComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  cols: Column[] = [
    { field: 'id', header: 'ID' },
    { field: 'licencePlate', header: 'SPZ' },
    { field: 'brand', header: 'Znacka' },
    { field: 'price', header: 'Cena' },
    { field: 'createdDate', header: 'Datum' },
    { field: 'action', header: 'Akce' },
  ];
  cars: Car[] = [];
  displaySidebar: boolean = false;
  selectedCar: Car | null = null;

  constructor(private carService: CarService) {
    this.cars = this.carService.getCars();
  }

  showCarDetail(car: Car) {
    this.selectedCar = car;
    this.displaySidebar = true;
  }

  closeCallback(e: Event) {
    this.sidebarRef.close(e);
  }

  formatValue(value: any, field: string): any {
    switch (field) {
      case 'price':
        return new Intl.NumberFormat('cs-CZ', {
          style: 'currency',
          currency: 'CZK',
          minimumFractionDigits: 0,
        }).format(value);
      case 'createdDate':
        const date = new Date(value);
        const day = date.getDate(); // Get day without leading zero
        const month = date.getMonth() + 1; // Get month (0-indexed), add 1 for 1-12 range
        const year = date.getFullYear();
        return `${day}.${month}.${year}`; // Format as desired (9.5.2019 is desired value for me, not 09. 05. 2019 like the toLocaleDateString does it)
      default:
        return value; // For other fields, return value as is
    }
  }
}
