# Setup

```sh
git checkout origin/testing-202-meal-planner-indirect-input-boilerplate

yarn
```

# 🎯 Goal: Sync meals from the `MealRepository` to the `MealPlanner`

On startup, the `MealPlanner` should fetch meals from the `MealRepository`.

# 📝 Steps with a Spy

0. [optional] you can either checkout the updated `MealPlanner` implementation first or go full-on TDD and implement the tests first.
```sh
git checkout origin/testing-203-meal-planner-indirect-input apps/whiskmate/src/app/meal-planner/meal-planner.service.ts
```

1. Run tests:

```sh
yarn test --watch
```

2. Remove the fake and create & provide the spy instead. _(Cf. [Tip: Create & provide a type-safe spy](#-tip--create--provide-a-type-safe-spy))_

3. Use the `setUpMealPlanner()` function instead of `createMealPlanner()` in order to configure the spy before creating the `MealPlanner`.

4. Check that the `MealPlanner` contains the meals from the `MealRepository`.

5. Check that the spy was called properly.

6. Checkout the implementation as mentioned at step 0 if you didn't do it already.

# 📝 Steps with a Fake

0. [optional] you can either checkout the updated `MealPlanner` implementation first or go full-on TDD and implement the tests first.
```sh
git checkout origin/testing-203-meal-planner-indirect-input apps/whiskmate/src/app/meal-planner/meal-planner.service.ts
```

1. Run tests:

```sh
yarn test --watch
```

2. Use the `setUpMealPlanner()` function instead of `createMealPlanner()` in order to configure the spy before creating the `MealPlanner`.

3. Check that the `MealPlanner` contains the meals from the `MealRepository`.

4. Checkout the implementation as mentioned at step 0 if you didn't do it already.
