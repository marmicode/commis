import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe';
import { RecipeRepository } from './recipe-repository.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wm-recipe-search',
  template: `🚧 &lt;wm-recipe-search&gt;`,
})
export class RecipeSearchComponent implements OnDestroy, OnInit {
  recipes?: Recipe[];

  private _subscription?: Subscription;

  constructor(private _recipeRepository: RecipeRepository) {}

  ngOnInit() {
    this._subscription = this._recipeRepository
      .search()
      .subscribe((recipes) => (this.recipes = recipes));
  }

  ngOnDestroy() {
    this._subscription?.unsubscribe();
  }
}
