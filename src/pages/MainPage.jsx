import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesList from '../components/RecipesList';

function MainPage() {
  const { isInMealsPage } = useContext(RecipesContext);

  const getTitle = () => (isInMealsPage ? 'Meals' : 'Cocktails');

  return (
    <>
      <Header title={getTitle()} showSearchBar />
      <main>
        <RecipesList />
      </main>
      <Footer />
    </>
  );
}

export default MainPage;
