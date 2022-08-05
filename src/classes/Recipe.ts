import { APIRecipeType } from '../@types';
import { loadRecipe, saveRecipe } from '../services/LocalStorageManager';
import { MEALS_TYPE, DRINKS_TYPE } from '../services/RecipesAPI';
import type { Ingredient } from '../@types';

// eslint-disable-next-line max-len
// Regex taken from https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
const tagsSeparator = /(?:,| )+/;

const extractList = (recipe: APIRecipeType, keyName:string): string[] => (
  Object.entries(recipe)
    .filter((e) => e[0].includes(keyName))
    .map((m) => m[1])
    .filter((m) => m && m !== ' ') as string[] || []
);

export default class Recipe {
  readonly id: string;
  readonly recipeType: string;
  readonly name: string;
  readonly thumb: string;
  readonly category: string;
  readonly instructions: string;
  readonly alcoholic: string | undefined;
  readonly youtubeLink: string;
  ingredients: readonly Ingredient[];
  tags: readonly string[];
  private checkedIngredients: string[] = [];
  private favorite: boolean = false;

  constructor();
  constructor(apiRecipe: APIRecipeType);
  constructor(apiRecipe?: APIRecipeType) {
    this.id = apiRecipe?.idMeal || apiRecipe?.idDrink || '';
    this.name = apiRecipe?.strMeal || apiRecipe?.strDrink || '';
    this.thumb = apiRecipe?.strMealThumb || apiRecipe?.strDrinkThumb || '';
    this.category = apiRecipe?.strCategory || '';
    this.instructions = apiRecipe?.strInstructions || '';
    this.alcoholic = apiRecipe?.strAlcoholic;
    this.youtubeLink = apiRecipe?.strYoutube || '';
    this.tags = apiRecipe?.strTags ? apiRecipe.strTags.split(tagsSeparator) : [];

    const getType = (r: APIRecipeType): string => (r.idMeal ? MEALS_TYPE : DRINKS_TYPE);
    this.recipeType = apiRecipe ? getType(apiRecipe) : '';

    const ingNames = extractList(apiRecipe || {}, 'Ingredient');
    const ingMeasures = extractList(apiRecipe || {}, 'Measure');
    const ings: Ingredient[] = [];
    ingNames.forEach((n, index) => ings.push({ name: n, measure: ingMeasures[index] }));

    this.ingredients = ings;

    const savedRecipe = loadRecipe(this.id);
    if (savedRecipe) {
      this.checkedIngredients = savedRecipe.checkedIngredients;
      this.favorite = savedRecipe.favorite;
    }
  }

  isDone = (): boolean => this.ingredients.every((ing) => this.checkedIngredients.includes(ing.name));

  save = (): void => saveRecipe(this);

  isFavorite = (): boolean => this.favorite;

  setFavorite = (favorite: boolean): void => {
    this.favorite = favorite;
    this.save();
  };

  checkIngredient = (ingredient: string, isChecked: boolean): void => {
    if (!this.ingredients.some((ing) => ing.name === ingredient)) {
      throw Error('Trying to check/uncheck ingredient that doesn\'t belong to the recipe.');
    }

    this.checkedIngredients = this.checkedIngredients.filter((ing) => ing !== ingredient); // for making sure it's not added twice
    if (isChecked) this.checkedIngredients.push(ingredient);
    this.save();
  };

  // isIngredientChecked = (ingredient: string): boolean => this.checkedIngredients.includes(ingredient);

  getCheckedIngredients = (): string[] => this.checkedIngredients;

  isInProgress = (): boolean => this.checkedIngredients.length > 0;
}
