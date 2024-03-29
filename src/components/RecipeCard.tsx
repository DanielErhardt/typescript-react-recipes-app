import React from 'react';
import { useNavigate } from 'react-router-dom';
import Recipe from '../classes/Recipe';
import StyledRecipeCard from '../styles/components/RecipeCard.styled';

interface Props{
  recipe: Recipe,
}

function RecipeCard({ recipe }: Props) {
  const navigate = useNavigate();
  const {
    id, name, thumb, category, recipeType,
  } = recipe;
  return (
    <StyledRecipeCard
      onClick={() => {
        navigate(`../${recipeType}/${id}`);
        navigate(0); // Apparently there's a bug where react v6 useNavigate doesn't refresh sometimes. This line forces it.
      }}
      type="button"
    >
      <img src={thumb} alt="recipe thumb" />
      <h2>{name}</h2>
      {category && <p>{`${category}`}</p>}
    </StyledRecipeCard>
  );
}

export default RecipeCard;
