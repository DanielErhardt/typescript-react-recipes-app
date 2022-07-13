import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import RecipesContext from '../context/RecipesContext';
import { openModalWindow } from '../helpers';

function RecipesList() {
  const { recipes, resetRecipes, fetchAll } = useContext(RecipesContext);
  const navigate = useNavigate();
  const { pathname: path } = useLocation();

  useEffect(() => {
    if (recipes) {
      if (recipes.length === 0) fetchAll();
      if (recipes.length === 1) {
        navigate(`${path}/${recipes[0].idMeal || recipes[0].idDrink}`);
        resetRecipes();
      }
    } else {
      openModalWindow('Could not find any matching recipes.');
      fetchAll();
    }
  }, [recipes]);

  return (
    <div className="recipes-list">
      {recipes && recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal || recipe.idDrink}
          recipe={recipe}
        />
      ))}
    </div>
  );
}

export default RecipesList;
