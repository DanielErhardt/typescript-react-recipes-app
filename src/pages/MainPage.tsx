import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesList from '../components/RecipesList';
import { MEALS_TYPE } from '../services/RecipesAPI';

function MainPage(): JSX.Element {
  const { getRecipeType } = useContext(RecipesContext);

  const getTitle = (): string => (getRecipeType() === MEALS_TYPE ? 'Foods' : 'Drinks');

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
