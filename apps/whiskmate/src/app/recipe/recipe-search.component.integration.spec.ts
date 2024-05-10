import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import { RecipeSearchComponent } from './recipe-search.component';
import {
  provideRecipeRepositoryFake,
  RecipeRepositoryFake,
} from './recipe-repository.fake';
import { recipeMother } from '../testing/recipe.mother';

describe(RecipeSearchComponent.name, () => {
  it('should search recipes without filtering', async () => {
    const { getRecipeNames } = await renderComponent();

    expect(getRecipeNames()).toEqual(['Burger', 'Salad']);
  });

  async function renderComponent() {
    const { fixture } = await render(RecipeSearchComponent, {
      providers: [
        provideRecipeRepositoryFake(),
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
      configureTestBed(testBed) {
        testBed
          .inject(RecipeRepositoryFake)
          .setRecipes([
            recipeMother.withBasicInfo('Burger').build(),
            recipeMother.withBasicInfo('Salad').build(),
          ]);
      },
    });

    await fixture.whenStable();

    return {
      getRecipeNames() {
        return screen.queryAllByRole('heading').map((el) => el.textContent);
      },
    };
  }
});
