import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
import { z } from 'zod';
import { CarService } from '../services/car.service';

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
export class CarDetailComponent implements OnInit {
  @Output() closeEmitter = new EventEmitter<Event>();
  @Output() carUpdated = new EventEmitter<Car>();

  // I decided for setter (like you said during the interview, setter could be used in scenario like this one) approach instead of using OnChanges.
  // Another option preventing using OnChanges could be using BehaviorSubject
  @Input()
  set car(value: Car) {
    this._car = value;
    if (this._car) {
      // Convert createdDate to Date object before patching
      this.carForm.patchValue({
        ...this._car,
        createdDate: this._car.createdDate
          ? new Date(this._car.createdDate)
          : null,
      });
    }
  }
  private _car!: Car;

  get car(): Car {
    return this._car;
  }

  carForm: FormGroup;

  carBrands: CarBrand[] = ['AUDI', 'BMW', 'MERCEDES', 'SKODA'];
  carFormSchema = z.object({});

  constructor(private fb: FormBuilder, private carService: CarService) {
    this.carForm = this.fb.group({
      id: [{ value: '', disabled: true }, Validators.required],
      licencePlate: ['', Validators.required],
      brand: ['', Validators.required],
      price: [0, Validators.required],
      createdDate: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    const carBrands = ['AUDI', 'BMW', 'MERCEDES', 'SKODA'] as const;

    // I chose for data validation zod
    this.carFormSchema = z.object({
      licencePlate: z.string().min(1, 'Licence plate cannot be empty'),
      brand: z.enum(carBrands, { required_error: 'Brand is required' }),
      price: z.number().min(100, 'Price must be greater than 100'),
      createdDate: z.date(),
    });
  }

  saveCar() {
    const result = this.carFormSchema.safeParse(this.carForm.getRawValue());

    if (result.success) {
      const updatedCar: Car = {
        ...this.car, // Start with the existing car details
        ...result.data, // Overwrite with the validated form data
      };
      const carId = this.car.id;

      this.carService.updateCar(carId, updatedCar).subscribe({
        next: (updatedCar) => {
          this.carUpdated.emit(updatedCar); // Emit the updated car
        },
        error: (error) => {
          console.error('Error updating the car:', error);
        },
      });
    } else {
      console.error('Validation errors:', result.error.format());
    }
  }

  emitClose(event: Event) {
    this.closeEmitter.emit(event);
  }
}
