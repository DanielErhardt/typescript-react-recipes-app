import Recipe from '../classes/Recipe';
import { SavedRecipesProgressType } from '../@types';

const USER = 'user';
const MEALS_TOKEN = 'mealsToken';
const COCKTAILS_TOKEN = 'cocktailsToken';
const DONE_RECIPES = 'doneRecipes';
const FAVORITE_RECIPES = 'favoriteRecipes';
const RECIPES_PROGRESS = 'recipesProgress';

export const saveUser = (email: string): void => localStorage.setItem(USER, email);
export const loadUser = ():string => localStorage.getItem(USER) || '';

export const saveMealsToken = (token: string): void => localStorage.setItem(MEALS_TOKEN, token);
export const loadMealsToken = (): string => localStorage.getItem(MEALS_TOKEN) || '1';

export const saveCocktailsToken = (token: string): void => localStorage
  .setItem(COCKTAILS_TOKEN, token);
export const loadCocktailsToken = (): string => localStorage.getItem(COCKTAILS_TOKEN) || '1';

const loadRecipeArray = (key: string): Recipe[] => JSON
  .parse(localStorage.getItem(key) as string) || [];
const saveRecipeInArray = (key: string, recipe: Recipe) => {
  const list = loadRecipeArray(key);
  const newList = list.some((r) => r.id === recipe.id) ? list : [...list, recipe];
  localStorage.setItem(key, JSON.stringify(newList));
};
const removeRecipeFromArray = (key: string, recipe: Recipe) => {
  const list = loadRecipeArray(key);
  const newList = list.filter((r) => r.id !== recipe.id);
  localStorage.setItem(key, JSON.stringify(newList));
};
const isRecipeInArray = (key: string, recipe: Recipe): boolean => loadRecipeArray(key)
  .some((r) => r.id === recipe.id);

export const loadFavoriteRecipes = (): Recipe[] => loadRecipeArray(FAVORITE_RECIPES);
export const saveFavoriteRecipe = (recipe: Recipe): void => saveRecipeInArray(FAVORITE_RECIPES, recipe);
export const removeFavoriteRecipe = (recipe: Recipe): void => removeRecipeFromArray(FAVORITE_RECIPES, recipe);
export const isRecipeFavorite = (recipe: Recipe): boolean => isRecipeInArray(FAVORITE_RECIPES, recipe);

export const loadDoneRecipes = () => loadRecipeArray(DONE_RECIPES);
export const saveDoneRecipe = (recipe: Recipe) => saveRecipeInArray(DONE_RECIPES, recipe);
export const isRecipeDone = (recipe: Recipe) => isRecipeInArray(DONE_RECIPES, recipe);

const loadRecipesInProgress = (): SavedRecipesProgressType => JSON.parse(localStorage.getItem(RECIPES_PROGRESS) as string) || {};
export const loadRecipeProgress = (recipe: Recipe): string[] => loadRecipesInProgress()[recipe.id] || [];
export const saveRecipeProgress = (recipe: Recipe, usedIngredients: string[]): void => {
  const progress = { ...loadRecipesInProgress(), [recipe.id]: usedIngredients };
  localStorage.setItem(RECIPES_PROGRESS, JSON.stringify(progress));
};
export const isRecipeInProgress = (recipe: Recipe): boolean => Object
  .keys(loadRecipesInProgress()).includes(recipe.id);
// export const removeRecipeProgress = (recipe) => delete loadRecipesInProgress()[getId(recipe)];
