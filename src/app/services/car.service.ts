import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/car.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'https://6719a4e27fc4c5ff8f4e02bf.mockapi.io/api/cars';

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  updateCar(id: number, updatedCar: Car): Observable<Car> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Car>(url, updatedCar);
  }
}
