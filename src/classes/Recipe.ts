import { APIObjectType } from '../@types';

// eslint-disable-next-line max-len
// Regex taken from https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
const tagsSeparator = /(?:,| )+/;

const extractList = (recipe: APIObjectType, keyName:string): string[] => (
  Object.entries(recipe)
    .filter((e) => e[0].includes(keyName))
    .map((m) => m[1])
    .filter((m) => m && m !== ' ') as string[] || []
);

export default class Recipe {
  id: string;
  name: string;
  thumb: string;
  category: string;
  description: string;
  alcoholic: string | undefined;
  youtubeLink: string;
  ingredients: string[];
  measures: string[];
  tags: string[];

  constructor(recipe: APIObjectType) {
    this.id = recipe.idMeal || recipe.idDrink;
    this.name = recipe.strMeal || recipe.strDrink;
    this.thumb = recipe.strMealThumb || recipe.strDrinkThumb;
    this.category = recipe.strCategory;
    this.description = recipe.strDescription;
    this.alcoholic = recipe.strAlcoholic;
    this.youtubeLink = recipe.strYoutube;
    this.ingredients = extractList(recipe, 'Ingredients');
    this.measures = extractList(recipe, 'Measures');
    this.tags = recipe.strTags ? recipe.strTags.split(tagsSeparator) : [];
  }
}
