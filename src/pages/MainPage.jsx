import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesList from '../components/RecipesList';
import { MEALS_TYPE, COCKTAILS_TYPE, fetchAllRecipes } from '../services/RecipesAPI';

function MainPage() {
  const { recipes, setRecipes } = useContext(RecipesContext);
  const location = useLocation();
  const currentType = location.pathname.includes('meal') ? MEALS_TYPE : COCKTAILS_TYPE;

  useEffect(() => {
    const fetch = async () => {
      if (recipes.length === 0) {
        const data = await fetchAllRecipes(currentType);
        setRecipes(data[currentType]);
      }
    };

    fetch();

    return () => {
      setRecipes([]);
    };
  }, []);

  return (
    <div className="page-wrapper">
      <Header title="Recipes" />
      <div className="page-content main-page-content">
        <RecipesList />
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
