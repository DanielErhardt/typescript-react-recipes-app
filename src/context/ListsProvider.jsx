import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ListsContext from './ListsContext';

import {
  MEALS_TYPE, COCKTAILS_TYPE,
  fetchAllMealsAreas,
  fetchCategories, fetchIngredients,
} from '../services/RecipesAPI';

function ListsProvider({ children }) {
  const [mealsCategories, setMealsCategories] = useState([]);
  const [cocktailsCategories, setCocktailsCategories] = useState([]);
  const [mealsIngredients, setMealsIngredients] = useState([]);
  const [cocktailsIngredients, setCocktailsIngredients] = useState([]);
  const [mealsNationalities, setMealsNationalities] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const mCat = await fetchCategories(MEALS_TYPE);
      const cCat = await fetchCategories(COCKTAILS_TYPE);
      const mIng = await fetchIngredients(MEALS_TYPE);
      const cIng = await fetchIngredients(COCKTAILS_TYPE);
      const mNat = await fetchAllMealsAreas();

      const mealsCatArray = mCat.meals.map((cat) => cat.strCategory);
      mealsCatArray.unshift('All');
      const cocktailsCatArray = cCat.drinks.map((cat) => cat.strCategory);
      cocktailsCatArray.unshift('All');

      const mealsNatArray = mNat.meals.map((nat) => nat.strArea);
      mealsNatArray.unshift('None');

      setMealsCategories(mealsCatArray);
      setCocktailsCategories(cocktailsCatArray);
      setMealsIngredients(mIng.meals.map((ing) => ing.strIngredient));
      setCocktailsIngredients(cIng.drinks.map((ing) => ing.strIngredient1));
      setMealsNationalities(mealsNatArray);
    };
    fetch();
  }, []);

  const contextType = useMemo(() => ({
    mealsCategories,
    cocktailsCategories,
    mealsIngredients,
    cocktailsIngredients,
    mealsNationalities,
  }), [mealsCategories, cocktailsCategories,
    mealsIngredients, cocktailsIngredients, mealsNationalities]);

  return (
    <ListsContext.Provider value={contextType}>
      {children}
    </ListsContext.Provider>
  );
}

ListsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListsProvider;
