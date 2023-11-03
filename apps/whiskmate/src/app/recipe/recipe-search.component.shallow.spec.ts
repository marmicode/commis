import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { recipeMother } from '../testing/recipe.mother';
import { RecipeSearchComponent } from './recipe-search.component';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { render } from '@testing-library/angular';

describe(RecipeSearchComponent.name, () => {
  it('should search recipes without filtering', async () => {
    const { getRecipeNames } = await renderComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  async function renderComponent() {
    const { debugElement } = await render(RecipeSearchComponent, {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideRecipeRepositoryFake()],
      configureTestBed(testBed) {
        testBed.overrideComponent(RecipeSearchComponent, {
          set: {
            imports: [CommonModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
          },
        });

        testBed
          .inject(RecipeRepositoryFake)
          .setRecipes([
            recipeMother.withBasicInfo('Burger').build(),
            recipeMother.withBasicInfo('Salad').build(),
          ]);
      },
    });

    return {
      getRecipeNames() {
        return debugElement
          .queryAll(By.css('wm-recipe-preview'))
          .map((previewEl) => previewEl.properties.recipe.name);
      },
    };
  }
});
