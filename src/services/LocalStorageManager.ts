import Recipe from '../classes/Recipe';
import { SavedRecipesType } from '../@types';

const USER = 'user';
const MEALS_TOKEN = 'mealsToken';
const COCKTAILS_TOKEN = 'cocktailsToken';
const SAVED_RECIPES = 'savedRecipes';

export const saveUser = (email: string): void => localStorage.setItem(USER, email);
export const loadUser = ():string => localStorage.getItem(USER) || '';

export const saveMealsToken = (token: string): void => localStorage.setItem(MEALS_TOKEN, token);
export const loadMealsToken = (): string => localStorage.getItem(MEALS_TOKEN) || '1';

export const saveCocktailsToken = (token: string): void => localStorage
  .setItem(COCKTAILS_TOKEN, token);
export const loadCocktailsToken = (): string => localStorage.getItem(COCKTAILS_TOKEN) || '1';

const loadAllRecipes = (): SavedRecipesType => {
  const recipes = localStorage.getItem(SAVED_RECIPES);
  return recipes ? JSON.parse(recipes) : {};
};

export const loadRecipe = (id: string): Recipe | undefined => {
  const savedRecipes = loadAllRecipes();
  return Object.values(savedRecipes).find((recipe) => recipe.id === id);
};

export const removeRecipe = (id: string): void => {
  const savedRecipes = loadAllRecipes();
  delete savedRecipes[id];
  localStorage.setItem(SAVED_RECIPES, JSON.stringify(savedRecipes));
};

export const saveRecipe = (recipe: Recipe): void => {
  const savedRecipes = loadAllRecipes();
  const modifiedRecipes: SavedRecipesType = {
    ...savedRecipes,
    [recipe.id]: recipe,
  };
  localStorage.setItem(SAVED_RECIPES, JSON.stringify(modifiedRecipes));
};
