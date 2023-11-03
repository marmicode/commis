import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createRecipeFilter, RecipeFilter } from './recipe-filter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wm-recipe-filter',
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="filterFormGroup">
      <mat-form-field>
        <mat-label>Keywords</mat-label>
        <input formControlName="keywords" matInput type="text" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Max Ingredients</mat-label>
        <input formControlName="maxIngredientCount" matInput type="number" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Max Steps</mat-label>
        <input formControlName="maxStepCount" matInput type="number" />
      </mat-form-field>
    </form>
  `,
  styles: [
    `
      :host {
        text-align: center;
      }
    `,
  ],
})
export class RecipeFilterComponent {
  @Output() filterChange: Observable<RecipeFilter>;

  filterFormGroup = new FormGroup({
    keywords: new FormControl(),
    maxIngredientCount: new FormControl(),
    maxStepCount: new FormControl(),
  });

  constructor() {
    this.filterChange = this.filterFormGroup.valueChanges.pipe(
      map((value) => createRecipeFilter(value))
    );
  }
}
