import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productos } from './components/productos/productos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Productos],
  template: `<app-productos></app-productos>`,
  styleUrl: './app.css'
})
export class App {}