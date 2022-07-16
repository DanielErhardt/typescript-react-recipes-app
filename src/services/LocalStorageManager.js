const USER = 'user';
const MEALS_TOKEN = 'mealsToken';
const COCKTAILS_TOKEN = 'cocktailsToken';
const DONE_RECIPES = 'doneRecipes';
const FAVORITE_RECIPES = 'favoriteRecipes';
const RECIPES_PROGRESS = 'recipesProgress';

export const saveUser = (email) => localStorage.setItem(USER, email);
export const loadUser = () => localStorage.getItem(USER) || '';

export const saveMealsToken = (token) => localStorage.setItem(MEALS_TOKEN, token);
export const loadMealsToken = () => JSON.parse(localStorage.getItem(MEALS_TOKEN)) || 1;

export const saveCocktailsToken = (token) => localStorage.setItem(COCKTAILS_TOKEN, token);
export const loadCocktailsToken = () => localStorage.getItem(COCKTAILS_TOKEN) || 1;

const getId = (recipe) => (recipe.idMeal || recipe.idDrink);

const loadRecipeArray = (key) => JSON.parse(localStorage.getItem(key)) || [];
const saveRecipeInArray = (key, recipe) => {
  const list = loadRecipeArray(key);
  const newList = list.some((r) => getId(r) === getId(recipe)) ? list : [...list, recipe];
  localStorage.setItem(key, JSON.stringify(newList));
};
const removeRecipeFromArray = (key, recipe) => {
  const list = loadRecipeArray(key);
  const newList = list.filter((r) => getId(r) !== getId(recipe));
  localStorage.setItem(key, JSON.stringify(newList));
};
const isRecipeInArray = (key, recipe) => loadRecipeArray(key)
  .some((r) => getId(r) === getId(recipe));

export const loadFavoriteRecipes = () => loadRecipeArray(FAVORITE_RECIPES);
export const saveFavoriteRecipe = (recipe) => saveRecipeInArray(FAVORITE_RECIPES, recipe);
export const removeFavoriteRecipe = (recipe) => removeRecipeFromArray(FAVORITE_RECIPES, recipe);
export const isRecipeFavorite = (recipe) => isRecipeInArray(FAVORITE_RECIPES, recipe);

export const loadDoneRecipes = () => loadRecipeArray(DONE_RECIPES);
export const saveDoneRecipe = (recipe) => saveRecipeInArray(DONE_RECIPES, recipe);
export const isRecipeDone = (recipe) => isRecipeInArray(DONE_RECIPES, recipe);

const loadRecipesInProgress = () => JSON.parse(localStorage.getItem(RECIPES_PROGRESS)) || {};
export const loadRecipeProgress = (recipe) => loadRecipesInProgress()[getId(recipe)] || [];
export const saveRecipeProgress = (recipe, usedIngredients) => {
  const progress = { ...loadRecipesInProgress(), [getId(recipe)]: usedIngredients };
  localStorage.setItem(RECIPES_PROGRESS, JSON.stringify(progress));
};
export const isRecipeInProgress = (recipe) => Object
  .keys(loadRecipesInProgress()).includes(getId(recipe));
// export const removeRecipeProgress = (recipe) => delete loadRecipesInProgress()[getId(recipe)];
