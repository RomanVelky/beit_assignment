import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  getCars(): Car[] {
    return [
      {
        id: 1,
        licencePlate: 'SC009GH',
        brand: 'AUDI',
        price: 549000,
        createdDate: new Date('2020-01-01'),
      },
      {
        id: 2,
        licencePlate: 'GA123CY',
        brand: 'BMW',
        price: 950000,
        createdDate: new Date('2019-05-10'),
      },
      {
        id: 3,
        licencePlate: 'BL001AA',
        brand: 'BMW',
        price: 1399000,
        createdDate: new Date('2023-01-22'),
      },
      {
        id: 4,
        licencePlate: 'BL512AN',
        brand: 'MERCEDES',
        price: 999000,
        createdDate: new Date('2021-10-18'),
      },
      {
        id: 5,
        licencePlate: 'XYZ789',
        brand: 'AUDI',
        price: 349000,
        createdDate: new Date('2012-06-2'),
      },
      {
        id: 6,
        licencePlate: 'BB005XL',
        brand: 'MERCEDES',
        price: 600000,
        createdDate: new Date('2014-08-09'),
      },
      {
        id: 7,
        licencePlate: 'BB789AZ',
        brand: 'SKODA',
        price: 600000,
        createdDate: new Date('2024-04-08'),
      },
      {
        id: 8,
        licencePlate: 'PD458AC',
        brand: 'SKODA',
        price: 675000,
        createdDate: new Date('2024-09-29'),
      },
    ];
  }
}
