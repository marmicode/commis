import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RecipeFilter } from './recipe-filter';
import { RecipeFilterComponent } from './recipe-filter.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createObserver } from '../../testing/observer';

describe(RecipeFilterComponent.name, () => {
  const { observe } = createObserver();

  it('should trigger filterChange output', () => {
    const { component, setInputValue } = renderComponent();

    const observer = observe(component.filterChange);

    setInputValue('keywords-input', 'Cauliflower');
    setInputValue('max-ingredient-count-input', '3');
    setInputValue('max-step-count-input', '10');

    expect(observer.next).lastCalledWith({
      keywords: 'Cauliflower',
      maxIngredientCount: 3,
      maxStepCount: 10,
    } as RecipeFilter);
  });

  function renderComponent() {
    TestBed.configureTestingModule({ imports: [NoopAnimationsModule] });
    const fixture = TestBed.createComponent(RecipeFilterComponent);

    fixture.detectChanges();

    return {
      component: fixture.componentInstance,
      setInputValue(
        dataRole:
          | 'keywords-input'
          | 'max-ingredient-count-input'
          | 'max-step-count-input',
        value: string
      ) {
        const el = fixture.debugElement.query(
          By.css(`[data-role="${dataRole}"]`)
        );
        el.nativeElement.value = value;
        el.nativeElement.dispatchEvent(new Event('input'));
      },
    };
  }
});
