import React, { useContext } from 'react';
import RecipeCard from './RecipeCard';
import RecipesContext from '../context/RecipesContext';

function RecipesList() {
  const { recipes } = useContext(RecipesContext);
  return (
    <div className="recipes-list">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal || recipe.idDrink}
          recipe={recipe}
        />
      ))}
    </div>
  );
}

export default RecipesList;
