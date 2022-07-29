import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesList from '../components/RecipesList';

function MainPage(): JSX.Element {
  const { isSearchingForMeals } = useContext(RecipesContext);

  const getTitle = (): string => (isSearchingForMeals() ? 'Meals' : 'Cocktails');

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
