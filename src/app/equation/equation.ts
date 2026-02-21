import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators';
import { AnswerHighlight } from "../answer-highlight";
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  imports: [ReactiveFormsModule, CommonModule, AnswerHighlight],
  templateUrl: './equation.html',
  styleUrl: './equation.css',
})
export class Equation {
  secondsPerSolution = 0;
  mathForm = new FormGroup({
    a: new FormControl(this.randomNumber()),
    b: new FormControl(this.randomNumber()),
    answer: new FormControl(''),
  }, [MathValidators.addition('answer', 'a', 'b')]);

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }

  get a() {
    return this.mathForm.get('a')?.value;
  }

  get b() {
    return this.mathForm.get('b')?.value;
  }

  ngOnInit() {
    this.mathForm.statusChanges.pipe(
      filter((value) => value === 'VALID'),
      delay(500),
      scan((acc) => {
        return {
          numberSolved: acc.numberSolved + 1,
          startTime: acc.startTime,
        };
      } , { numberSolved: 0, startTime: new Date() })
    ).subscribe(({ numberSolved, startTime }) => {
      this.secondsPerSolution = (new Date().getTime() - startTime.getTime()) / numberSolved / 1000;

      this.mathForm.patchValue({
        a: this.randomNumber(),
        b: this.randomNumber(),
        answer: '',
      });
    });
  }
}
