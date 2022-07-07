import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = recipe.idMeal || recipe.idDrink;
  const name = recipe.strMeal || recipe.strDrink;
  const thumb = recipe.strMealThumb || recipe.strDrinkThumb;
  const category = recipe.strCategory;

  return (
    <button
      type="button"
      className="recipe-card"
      onClick={() => navigate(`${pathname}/${id}`)}
    >
      {thumb}
      {category}
      {name}
    </button>
  );
}

RecipeCard.defaultProps = {
  recipe: PropTypes.shape({
    idMeal: '',
    idDrink: '',
    strMeal: '',
    strDrink: '',
    strMealThumb: '',
    strDrinkThumb: '',
    strCategory: '',
  }),
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strCategory: PropTypes.string,
  }),
};

export default RecipeCard;
