import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Equation } from "./equation/equation";

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, Equation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mathform');
}
