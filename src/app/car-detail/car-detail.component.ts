import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { Car, CarBrand } from '../models/car.model';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    CardModule,
    InputNumberModule,
  ],
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
})
export class CarDetailComponent {
  @Input() car: Car | null;
  carForm: FormGroup;
  carBrands: CarBrand[];

  constructor(private fb: FormBuilder) {
    this.car = null;
    this.carBrands = ['AUDI', 'BMW', 'MERCEDES', 'SKODA'];
    this.carForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      licencePlate: ['', Validators.required],
      brand: ['', Validators.required],
      price: [0, Validators.required],
      createdDate: [null, Validators.required],
    });
  }

  ngOnChanges() {
    if (this.car) {
      this.carForm.patchValue(this.car);
    }
  }

  saveCar() {
    if (this.carForm.valid) {
      // Save the car details logic
    }
  }

  close() {
    // Logic to close the sidebar
  }
}
