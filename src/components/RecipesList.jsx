import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import RecipesContext from '../context/RecipesContext';
import ModalWindow from './ModalWindow';

function RecipesList() {
  const { recipes, resetRecipes, fetchAll } = useContext(RecipesContext);
  const navigate = useNavigate();
  const { pathname: path } = useLocation();
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (recipes) {
      if (recipes.length === 0) fetchAll();
      if (recipes.length === 1) {
        navigate(`${path}/${recipes[0].idMeal || recipes[0].idDrink}`);
        resetRecipes();
      }
    } else {
      setModalMessage('Could not find any matching recipes.');
      fetchAll();
    }
  }, [recipes]);

  return (
    <div className="recipes-list">
      <ModalWindow message={modalMessage} onClose={() => setModalMessage('')} />
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
