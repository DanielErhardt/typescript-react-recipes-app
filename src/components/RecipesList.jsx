import React from 'react';
import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard';

function RecipesList({ recipes }) {
  return (
    <div className="recipes-card-list">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal || recipe.idDrink}
          recipe={recipe}
        />
      ))}
    </div>
  );
}

RecipesList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default RecipesList;
