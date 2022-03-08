import { shallowRef } from 'vue';
import { useRoute } from 'vue-router';
import { io } from 'socket.io-client';
import { nanoid } from './nanoid.mjs';

export default {
  template: `
  <ul>
    <li v-for="ingredient in ingredients" :key="ingredient.id">
      <input
        :value="ingredient.quantity"
        @input="e => updateIngredient(ingredient.id, {quantity: e.target.value})"
        style="width: 40px"
        type="number">

      <select
        :value="ingredient.unit"
        @input="e => updateIngredient(ingredient.id, {unit: e.target.value})"
        style="width: 100px">

        <option value="">--Please choose a unit--</option>
        <option value="g">Grams</option>
        <option value="kg">Kilograms</option>
        <option value="ml">Milliliters</option>
        <option value="cl">Centiliters</option>
        <option value="l">Liters</option>

        <option value="pinch">Pinches</option>
        <option value="coffee-spoon">Coffee Spoon</option>
        <option value="soup-spoon">Soup Spoon</option>

      </select>

      <input 
        :value="ingredient.name"
        @input="e => updateIngredient(ingredient.id, {name: e.target.value})">
    </li>

    <li><button @click="addIngredient" type="button">ADD INGREDIENT</button></li>

  </ul>
  `,
  setup() {
    const route = useRoute();
    const ingredients = shallowRef();
    const recipeId = route.params.recipeId;
    const socket = io('http://localhost:3000/ingredients', {
      query: {
        recipeId,
      },
    });

    ingredients.value = [];

    socket.on(
      'ingredients-loaded',
      ({ ingredients: _ingredients }) => (ingredients.value = _ingredients)
    );

    socket.on('ingredient-added', _addIngredient);

    socket.on('ingredient-changed', _updateIngredient);

    function _addIngredient({ ingredient }) {
      ingredients.value = [...ingredients.value, ingredient];
    }

    function _updateIngredient({ ingredientId, changes }) {
      ingredients.value = ingredients.value.map((ingredient) =>
        ingredient.id === ingredientId
          ? { ...ingredient, ...changes }
          : ingredient
      );
    }

    return {
      addIngredient() {
        const ingredient = {
          id: nanoid(),
          name: null,
          quantity: null,
          unit: null,
        };

        _addIngredient({ ingredient });

        socket.emit('ingredient-added', { ingredient });
      },
      updateIngredient(ingredientId, changes) {
        _updateIngredient({ ingredientId, changes });

        socket.emit('ingredient-changed', {
          ingredientId,
          changes,
        });
      },
      ingredients,
    };
  },
};
