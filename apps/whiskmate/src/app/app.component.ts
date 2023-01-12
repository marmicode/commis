import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from './title.component';
import { RecipeSearchComponent } from './recipe/recipe-search.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'wm-app',
  imports: [TitleComponent, RecipeSearchComponent],
  template: `
    <wm-title>👨🏻‍🍳 Welcome to Whiskmate 🥘</wm-title>
    <wm-recipe-search></wm-recipe-search>
  `,
})
export class AppComponent {}
