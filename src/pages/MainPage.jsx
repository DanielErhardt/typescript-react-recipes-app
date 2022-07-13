import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import ListsContext from '../context/ListsContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesList from '../components/RecipesList';
import DropDownMenu from '../components/DropDownMenu';

function MainPage() {
  const { fetchByCategory } = useContext(RecipesContext);
  const { categories } = useContext(ListsContext);

  const onCategoryChanged = ({ target: { value } }) => {
    fetchByCategory(value);
  };

  return (
    <>
      <Header title="Recipes" />
      <main>
        <DropDownMenu options={categories} label="Category: " onChange={onCategoryChanged} />
        <RecipesList />
      </main>
      <Footer />
    </>
  );
}

export default MainPage;
