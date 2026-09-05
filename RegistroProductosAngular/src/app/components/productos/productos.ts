import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {
  productForm: FormGroup;
  isSubmitted = false;
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', [Validators.required]],
      stock: [null, [Validators.required, Validators.min(0)]]
    });
  }

  get f() { return this.productForm.controls; }

  // Simulación del servicio de backend
  registerProduct(product: Product): Observable<boolean> {
    console.log('Datos enviados al servicio (Backend simulado):', product);
    return of(true);
  }

  onSubmit() {
    this.isSubmitted = true;
    
    if (this.productForm.valid) {
      this.registerProduct(this.productForm.value).subscribe(response => {
        if (response) {
          this.successMessage = '¡Producto registrado con éxito!';
          this.productForm.reset();
          this.isSubmitted = false;
        }
      });
    } else {
      this.successMessage = '';
    }
  }
}