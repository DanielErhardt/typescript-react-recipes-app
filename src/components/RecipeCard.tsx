import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Recipe from '../classes/Recipe';

interface Props{
  recipe: Recipe,
}

function RecipeCard({ recipe }: Props) {
  const { pathname } = useLocation();
  const {
    id, name, thumb, category,
  } = recipe;
  return (
    <Link
      className="recipe-card"
      to={`${pathname}/${id}`}
      type="button"
    >
      <img src={thumb} alt="recipe thumb" />
      <h2>{name}</h2>
      {category && <p>{`${category}`}</p>}
    </Link>
  );
}

export default RecipeCard;
