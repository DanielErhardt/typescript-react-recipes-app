import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import {
  MEALS_TYPE, DRINKS_TYPE,
  fetchAllMealsAreas, fetchCategories, fetchIngredients,
} from '../services/RecipesAPI';
import { APIDataType, RecipesContextType } from '../@types';
import Recipe from '../classes/Recipe';

type Props = {
  children: React.ReactNode,
};

function RecipesProvider({ children }: Props) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [drinksCategories, setDrinksCategories] = useState<string[]>([]);
  const [drinksIngredients, setDrinksIngredients] = useState<string[]>([]);
  const [mealsCategories, setMealsCategories] = useState<string[]>([]);
  const [mealsIngredients, setMealsIngredients] = useState<string[]>([]);
  const [mealsNationalities, setMealsNationalities] = useState<string[]>([]);
  const { pathname } = useLocation();

  const getRecipeType = (invert: boolean = false): string => {
    if (invert) return pathname.includes('meals') ? DRINKS_TYPE : MEALS_TYPE;
    return pathname.includes('meals') ? MEALS_TYPE : DRINKS_TYPE;
  };

  const updateRecipes = (apiResponse: APIDataType): void => {
    const responseType = apiResponse.meals ? MEALS_TYPE : DRINKS_TYPE;
    const newRecipes = apiResponse[responseType].map((apiRecipe) => new Recipe(apiRecipe));
    setRecipes(newRecipes || []);
  };

  useEffect(() => {
    const fetch = async () => {
      const [mCat, cCat, mIng, cIng, mNat] = await Promise.all(
        [
          fetchCategories(MEALS_TYPE),
          fetchCategories(DRINKS_TYPE),
          fetchIngredients(MEALS_TYPE),
          fetchIngredients(DRINKS_TYPE),
          fetchAllMealsAreas(),
        ],
      );

      const mealsCatArray = mCat.meals.map((cat) => cat.strCategory);
      mealsCatArray.unshift('All');
      const drinksCatArray = cCat.drinks.map((cat) => cat.strCategory);
      drinksCatArray.unshift('All');
      const mealsNatArray = mNat.meals.map((nat) => nat.strArea);
      mealsNatArray.unshift('None');

      setMealsCategories(mealsCatArray);
      setDrinksCategories(drinksCatArray);
      setMealsIngredients(mIng.meals.map((ing) => ing.strIngredient));
      setDrinksIngredients(cIng.drinks.map((ing) => ing.strIngredient1));
      setMealsNationalities(mealsNatArray);
    };

    fetch();
  }, []);

  const contextType = useMemo((): RecipesContextType => ({
    recipes,
    updateRecipes,
    resetRecipes: () => setRecipes([]),
    getRecipeType,
    categories: getRecipeType() === MEALS_TYPE ? mealsCategories : drinksCategories,
    ingredients: getRecipeType() === MEALS_TYPE ? mealsIngredients : drinksIngredients,
    nationalities: getRecipeType() === MEALS_TYPE ? mealsNationalities : null,
  }), [recipes, pathname]);

  return (
    <RecipesContext.Provider value={contextType}>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
