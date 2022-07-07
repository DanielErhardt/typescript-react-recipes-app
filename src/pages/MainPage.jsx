import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import ListsContext from '../context/ListsContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesList from '../components/RecipesList';
import DropDownMenu from '../components/DropDownMenu';
import { MEALS_TYPE, COCKTAILS_TYPE, fetchAllRecipes } from '../services/RecipesAPI';

function MainPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { recipes, setRecipes } = useContext(RecipesContext);
  const { mealsCategories, cocktailsCategories } = useContext(ListsContext);
  const { pathname } = useLocation();
  const currentType = pathname.includes('meal') ? MEALS_TYPE : COCKTAILS_TYPE;
  const categories = currentType === MEALS_TYPE ? mealsCategories : cocktailsCategories;

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
        <DropDownMenu options={categories} label="Category: " />
        <RecipesList />
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
