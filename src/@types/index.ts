import Recipe from '../classes/Recipe';

export type APIObjectType = {
  [key: string]: string;
};

export type APIResponseType = {
  [key: string]: APIObjectType[],
};

export type RecipesContextType ={
  recipes: Recipe[];
  updateRecipes: (apiResponse: APIResponseType) => void; // eslint-disable-line no-unused-vars
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
