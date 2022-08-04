import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import {
  MEALS_TYPE, COCKTAILS_TYPE,
  fetchAllMealsAreas, fetchCategories, fetchIngredients,
} from '../services/RecipesAPI';
import { APIResponseType, RecipesContextType } from '../@types';
import Recipe from '../classes/Recipe';

type Props = {
  children: React.ReactNode,
};

function RecipesProvider({ children }: Props) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cocktailsCategories, setCocktailsCategories] = useState<string[]>([]);
  const [cocktailsIngredients, setCocktailsIngredients] = useState<string[]>([]);
  const [mealsCategories, setMealsCategories] = useState<string[]>([]);
  const [mealsIngredients, setMealsIngredients] = useState<string[]>([]);
  const [mealsNationalities, setMealsNationalities] = useState<string[]>([]);
  const { pathname } = useLocation();

  const getRecipeType = (invert: boolean = false): string => {
    if (invert) return pathname.includes('meals') ? DRINKS_TYPE : MEALS_TYPE;
    return pathname.includes('meals') ? MEALS_TYPE : DRINKS_TYPE;
  };

  const updateRecipes = (apiResponse: APIResponseType): void => {
    const responseType = apiResponse.meals ? MEALS_TYPE : DRINKS_TYPE;
    const newRecipes = apiResponse[responseType].map((apiRecipe) => new Recipe(apiRecipe));
    setRecipes(newRecipes || []);
  };

  useEffect(() => {
    const fetch = async () => {
      const [mCat, cCat, mIng, cIng, mNat] = await Promise.all(
        [
          fetchCategories(MEALS_TYPE),
          fetchCategories(COCKTAILS_TYPE),
          fetchIngredients(MEALS_TYPE),
          fetchIngredients(COCKTAILS_TYPE),
          fetchAllMealsAreas(),
        ],
      );

      const mealsCatArray = mCat.meals.map((cat) => cat.strCategory);
      mealsCatArray.unshift('All');
      const cocktailsCatArray = cCat.drinks.map((cat) => cat.strCategory);
      cocktailsCatArray.unshift('All');
      const mealsNatArray = mNat.meals.map((nat) => nat.strArea);
      mealsNatArray.unshift('None');

      setMealsCategories(mealsCatArray);
      setCocktailsCategories(cocktailsCatArray);
      setMealsIngredients(mIng.meals.map((ing) => ing.strIngredient));
      setCocktailsIngredients(cIng.drinks.map((ing) => ing.strIngredient1));
      setMealsNationalities(mealsNatArray);
    };

    fetch();
  }, []);

  const contextType = useMemo((): RecipesContextType => ({
    recipes,
    updateRecipes,
    resetRecipes: () => setRecipes([]),
    getRecipeType,
    categories: getRecipeType() === MEALS_TYPE ? mealsCategories : cocktailsCategories,
    ingredients: getRecipeType() === MEALS_TYPE ? mealsIngredients : cocktailsIngredients,
    nationalities: getRecipeType() === MEALS_TYPE ? mealsNationalities : null,
  }), [recipes, pathname]);

  return (
    <RecipesContext.Provider value={contextType}>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
