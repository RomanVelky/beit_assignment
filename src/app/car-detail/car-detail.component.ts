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
  @Input() car!: Car;
  @Output() closeEmitter = new EventEmitter<Event>();

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
    this.carService.getCarss().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching cars', error);
      },
    });

    const carBrands = ['AUDI', 'BMW', 'MERCEDES', 'SKODA'] as const;

    this.carFormSchema = z.object({
      licencePlate: z.string().min(1, 'Licence plate cannot be empty'),
      brand: z.enum(carBrands, { required_error: 'Brand is required' }),
      price: z.number().min(100, 'Price must be greater than 100'),
      createdDate: z.date(),
    });
  }

  saveCar() {
    const result = this.carFormSchema.safeParse(this.carForm.value);

    if (result.success) {
      // Save the car details logic
      console.log('Car details are valid:', result.data);
    } else {
      // Handle validation errors
      console.log('Validation errors:', result.error.format());
    }
  }

  emitClose(event: Event) {
    this.closeEmitter.emit(event);
  }
}
