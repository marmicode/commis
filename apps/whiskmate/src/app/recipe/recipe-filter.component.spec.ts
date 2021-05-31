import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestBed } from '@angular/core/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeFilter } from './recipe-filter';
import {
  RecipeFilterComponent,
  RecipeFilterModule,
} from './recipe-filter.component';

describe(RecipeFilterComponent.name, () => {
  it('should trigger filterChange output', async () => {
    const observer = jest.fn();

    const { component, fixture, setInputValue } = await createComponent();

    fixture.detectChanges();

    component.filterChange.subscribe(observer);

    await setInputValue('[data-role=keywords-input]', 'Cauliflower');
    await setInputValue('[data-role=max-ingredient-count-input]', '3');
    await setInputValue('[data-role=max-step-count-input]', '10');

    expect(observer).lastCalledWith({
      keywords: 'Cauliflower',
      maxIngredientCount: 3,
      maxStepCount: 10,
    } as RecipeFilter);
  });

  async function createComponent() {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RecipeFilterModule],
    }).compileComponents();

    const fixture = TestBed.createComponent(RecipeFilterComponent);

    const loader = TestbedHarnessEnvironment.loader(fixture);

    return {
      component: fixture.componentInstance,
      fixture,
      async setInputValue(selector: string, value: string) {
        const harness = await loader.getHarness(
          MatInputHarness.with({ selector })
        );
        await harness.setValue(value);
      },
    };
  }
});
