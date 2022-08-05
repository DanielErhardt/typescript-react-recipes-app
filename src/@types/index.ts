import Recipe from '../classes/Recipe';

export type APIRecipeType = {
  [key: string]: string;
};

export type APIDataType = {
  [key: string]: APIRecipeType[],
};

export type SavedRecipesType = {
  [recipeId: string]: Recipe;
};

export type RecipesContextType ={
  recipes: Recipe[];
  updateRecipes: (apiResponse: APIDataType) => void; // eslint-disable-line no-unused-vars
  resetRecipes: () => void;
  getRecipeType: (invert?: boolean) => string;
  categories: string[];
  ingredients: string[];
  nationalities: string[] | null;
};

export type Ingrendient = {
  name: string;
  measure: string;
};
