export default class Recipe {
  private original: any;
  private tags: string;
  id: string;
  name: string;
  thumb: string;
  category: string;
  alcoholic: string | undefined;
  youtubeLink: string;

  constructor(recipe: any) {
    this.original = recipe;
    this.id = recipe.idMeal || recipe.idDrink;
    this.name = recipe.strMeal || recipe.strDrink;
    this.thumb = recipe.strMealThumb || recipe.strDrinkThumb;
    this.category = recipe.strCategory;
    this.alcoholic = recipe.strAlcoholic;
    this.tags = recipe.strTags;
    this.youtubeLink = recipe.strYoutube;
  }

  extractList(keyName:string): string[] {
    return Object.entries(this.original)
      .filter((e) => e[0].includes(keyName))
      .map((m) => m[1])
      .filter((m) => m && m !== ' ') as string[] || [];
  }

  getIngredients(): string[] { return this.extractList('Ingredient'); }

  getMeasures(): string[] { return this.extractList('Measure'); }

  getTags(): string[] {
    // eslint-disable-next-line max-len
    // Regex taken from https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
    const separator = /(?:,| )+/;
    if (this.tags) return this.tags.split(separator);
    return [];
  }
}
