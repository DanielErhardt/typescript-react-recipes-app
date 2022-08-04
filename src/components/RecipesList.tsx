import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import RecipesContext from '../context/RecipesContext';
import { fetchAllRecipes } from '../services/RecipesAPI';

function RecipesList(): JSX.Element {
  const {
    recipes, resetRecipes, updateRecipes, getRecipeType,
  } = useContext(RecipesContext);
  const navigate = useNavigate();
  const { pathname: path } = useLocation();

  useEffect(() => {
    const execute = async () => {
      if (recipes.length === 1) {
        navigate(`${path}/${recipes[0].id}`);
        resetRecipes();
      } else {
        updateRecipes(await fetchAllRecipes(getRecipeType()));
      }
    };

    execute();
  }, [recipes]);

  return (
    <div className="recipes-list">
      {recipes && recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
        />
      ))}
    </div>
  );
}

export default RecipesList;
