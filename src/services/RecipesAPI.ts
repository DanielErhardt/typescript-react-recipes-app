import { loadCocktailsToken, loadMealsToken } from './LocalStorageManager';
import { APIResponseType } from '../@types';

export const MEALS_TYPE = 'meals';
export const COCKTAILS_TYPE = 'drinks';

const MEALS_BASE_API = `https://www.themealdb.com/api/json/v1/${loadMealsToken()}`;
const COCKTAILS_BASE_API = `https://www.thecocktaildb.com/api/json/v1/${loadCocktailsToken()}`;

const getBaseURL = (type: string): string => (type === MEALS_TYPE
  ? MEALS_BASE_API : COCKTAILS_BASE_API);

const fetchBase = async (URL: string): Promise<APIResponseType> => {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchAllRecipes = async (type: string): Promise<APIResponseType> => (
  fetchBase(`${getBaseURL(type)}/search.php?s=`));

export const fetchRecipeById = async (type: string, id: string): Promise<APIResponseType> => (
  fetchBase(`${getBaseURL(type)}/lookup.php?i=${id}`));

export const fetchRecipesByName = async (type: string, name: string): Promise<APIResponseType> => (
  fetchBase(`${getBaseURL(type)}/search.php?s=${name}`));

export const fetchRecipesByFirstLetter = async (type: string, letter: string): Promise<APIResponseType> => (
  fetchBase(`${getBaseURL(type)}/search.php?f=${letter}`));

export const fetchRecipesByIngredient = async (type: string, ingredient: string): Promise<APIResponseType> => (
  fetchBase(`${getBaseURL(type)}/filter.php?i=${ingredient}`));

export const fetchRecipesByCategory = async (type: string, category: string): Promise<APIResponseType> => (
  fetchBase(`${getBaseURL(type)}/filter.php?c=${category}`));

export const fetchCategories = async (type: string): Promise<APIResponseType> => (
  fetchBase(`${getBaseURL(type)}/list.php?c=list`));

export const fetchIngredients = async (type: string): Promise<APIResponseType> => (
  fetchBase(`${getBaseURL(type)}/list.php?i=list`));

export const fetchRandomRecipe = async (type: string): Promise<APIResponseType> => (
  fetchBase(`${getBaseURL(type)}/random.php`));

export const fetchAllMealsAreas = async (): Promise<APIResponseType> => (
  fetchBase(`${getBaseURL(MEALS_TYPE)}/list.php?a=list`));

export const fetchMealsByArea = async (area: string): Promise<APIResponseType> => (
  fetchBase(`${getBaseURL(MEALS_TYPE)}/filter.php?a=${area}`));
