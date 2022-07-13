import React, { useState, useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import ListsContext from './ListsContext';
import {
  MEALS_TYPE, COCKTAILS_TYPE,
  fetchAllRecipes, fetchRecipeById, fetchRecipesByName,
  fetchRecipesByFirstLetter, fetchRecipesByIngredient,
  fetchRecipesByCategory, fetchRandomRecipe,
  fetchMealsByArea,
} from '../services/RecipesAPI';

function RecipesProvider({ children }) {
  const { categories, ingredients, nationalites } = useContext(ListsContext);
  const [recipes, setRecipes] = useState([]);
  const { pathname } = useLocation();
  const recipeType = pathname.includes('meals') ? MEALS_TYPE : COCKTAILS_TYPE;

  const extract = (data) => (data ? data[recipeType] : []);

  const fetchAll = async () => setRecipes(extract(await fetchAllRecipes(recipeType)));
  const fetchById = async (id) => setRecipes(extract(await fetchRecipeById(recipeType, id)));
  const fetchByName = async (name) => setRecipes(
    extract(await fetchRecipesByName(recipeType, name)),
  );
  const fetchByFirstLetter = async (letter) => setRecipes(
    extract(await fetchRecipesByFirstLetter(recipeType, letter)),
  );
  const fetchByIngredient = async (ingredient) => setRecipes(
    extract(ingredients[0] === ingredient
      ? await fetchAll()
      : await fetchRecipesByIngredient(recipeType, ingredient)),
  );
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
  const fetchRandom = async () => setRecipes(
    extract(await fetchRandomRecipe(recipeType)),
  );

  const contextValue = useMemo(() => ({
    fetchAll,
    fetchById,
    fetchByName,
    fetchByFirstLetter,
    fetchByIngredient,
    fetchByCategory,
    fetchMealsByNationality,
    fetchRandom,
    recipeType,
    recipes,
    resetRecipes: () => setRecipes([]),
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
