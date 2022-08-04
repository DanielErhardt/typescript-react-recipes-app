import { createContext } from 'react';
import { RecipesContextType } from '../@types';

const RecipesContext = createContext<RecipesContextType>({
  recipes: [],
  updateRecipes: () => {},
  resetRecipes: () => {},
  getRecipeType: () => '',
  categories: [],
  ingredients: [],
  nationalities: null,
});

export default RecipesContext;
