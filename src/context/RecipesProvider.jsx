import React, { useState, useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import ListsContext from './ListsContext';
import {
  MEALS_TYPE, COCKTAILS_TYPE,
  fetchAllRecipes,
  // fetchRecipesByName,
  // fetchRecipesByFirstLetter, fetchRecipesByIngredient,
  fetchRecipesByCategory, fetchMealsByArea,
} from '../services/RecipesAPI';

function RecipesProvider({ children }) {
  // const { categories, ingredients, nationalites } = useContext(ListsContext);
  const { categories, nationalites } = useContext(ListsContext);
  const [recipes, setRecipes] = useState([]);
  const { pathname } = useLocation();
  const recipeType = pathname.includes('meals') ? MEALS_TYPE : COCKTAILS_TYPE;

  const extract = (data, type = '') => {
    if (type) return data ? data[type] : [];
    return data ? data[recipeType] : [];
  };

  const fetchAll = async (invert = false) => {
    const invertedType = recipeType === MEALS_TYPE ? COCKTAILS_TYPE : MEALS_TYPE;
    if (invert) setRecipes(extract(await fetchAllRecipes(invertedType), invertedType));
    else setRecipes(extract(await fetchAllRecipes(recipeType)));
  };
  // const fetchByName = async (name) => setRecipes(
  //   extract(await fetchRecipesByName(recipeType, name)),
  // );
  // const fetchByFirstLetter = async (letter) => setRecipes(
  //   extract(await fetchRecipesByFirstLetter(recipeType, letter)),
  // );
  // const fetchByIngredient = async (ingredient) => setRecipes(
  //   extract(ingredients[0] === ingredient
  //     ? await fetchAll()
  //     : await fetchRecipesByIngredient(recipeType, ingredient)),
  // );
  const fetchByCategory = async (category) => setRecipes(
    extract(categories[0] === category
      ? await fetchAll()
      : await fetchRecipesByCategory(recipeType, category)),
  );
  const fetchMealsByNationality = async (nationality) => setRecipes(
    extract(nationalites[0] === nationality
      ? await fetchAll()
      : await fetchMealsByArea(nationality)),
  );

  const filterByName = async (name) => {
    setRecipes(recipes.filter((r) => {
      const recipeName = r.strMeal || r.strDrink;
      return recipeName.toLowerCase().includes(name.toLowerCase());
    }));
  };

  const filterByIngredient = async (ingredient) => {
    setRecipes(recipes.filter((r) => {
      const values = Object.values(r);
      return values.some((v) => typeof v === 'string' && v.toLowerCase().includes(ingredient.toLowerCase()));
    }));
  };

  const filterByFirstLetter = async (letter) => {
    setRecipes(recipes.filter((r) => {
      const firstLetter = (r.strMeal || r.strDrink).charAt(0);
      return firstLetter.toLowerCase() === letter.toLowerCase();
    }));
  };

  const contextValue = useMemo(() => ({
    fetchAll,
    // fetchByName,
    // fetchByFirstLetter,
    // fetchByIngredient,
    fetchByCategory,
    fetchMealsByNationality,
    filterByName,
    filterByIngredient,
    filterByFirstLetter,
    recipeType,
    recipes,
    resetRecipes: () => setRecipes([]),
    isInMealsPage: recipeType === MEALS_TYPE,
  }), [recipes, pathname]);

  return (
    <RecipesContext.Provider value={contextValue}>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
