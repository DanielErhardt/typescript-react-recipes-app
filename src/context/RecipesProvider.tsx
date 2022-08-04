import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import {
  MEALS_TYPE, DRINKS_TYPE,
  fetchAllMealsAreas, fetchCategories, fetchIngredients,
} from '../services/RecipesAPI';
import { APIResponseType, APIObjectType, RecipesContextType } from '../@types';
import Recipe from '../classes/Recipe';

type Props = {
  children: React.ReactNode,
};

function RecipesProvider({ children }: Props) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cocktailsCategories, setCocktailsCategories] = useState<string[]>([]);
  const [cocktailsIngredients, setCocktailsIngredients] = useState<string[]>([]);
  const [foodsCategories, setFoodsCategories] = useState<string[]>([]);
  const [foodsIngredients, setFoodsIngredients] = useState<string[]>([]);
  const [foodsNationalities, setFoodsNationalities] = useState<string[]>([]);
  const { pathname } = useLocation();

  const getRecipeType = (invert: boolean = false): string => {
    if (invert) return pathname.includes('foods') ? DRINKS_TYPE : MEALS_TYPE;
    return pathname.includes('foods') ? MEALS_TYPE : DRINKS_TYPE;
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
          fetchCategories(DRINKS_TYPE),
          fetchIngredients(MEALS_TYPE),
          fetchIngredients(DRINKS_TYPE),
          fetchAllMealsAreas(),
        ],
      );

      const foodsCatArray = mCat.meals.map((cat) => cat.strCategory);
      foodsCatArray.unshift('All');
      const cocktailsCatArray = cCat.drinks.map((cat) => cat.strCategory);
      cocktailsCatArray.unshift('All');
      const foodsNatArray = mNat.meals.map((nat) => nat.strArea);
      foodsNatArray.unshift('None');

      setFoodsCategories(foodsCatArray);
      setCocktailsCategories(cocktailsCatArray);
      setFoodsIngredients(mIng.meals.map((ing) => ing.strIngredient));
      setCocktailsIngredients(cIng.drinks.map((ing) => ing.strIngredient1));
      setFoodsNationalities(foodsNatArray);
    };

    fetch();
  }, []);

  const contextType = useMemo((): RecipesContextType => ({
    recipes,
    updateRecipes,
    resetRecipes: () => setRecipes([]),
    getRecipeType,
    categories: getRecipeType() === MEALS_TYPE ? foodsCategories : cocktailsCategories,
    ingredients: getRecipeType() === MEALS_TYPE ? foodsIngredients : cocktailsIngredients,
    nationalities: getRecipeType() === MEALS_TYPE ? foodsNationalities : null,
  }), [recipes, pathname]);

  return (
    <RecipesContext.Provider value={contextType}>
      {children}
    </RecipesContext.Provider>
  );
}

export default RecipesProvider;
