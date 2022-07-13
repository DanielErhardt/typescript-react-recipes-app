import React, { useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ListsContext from './ListsContext';

import {
  MEALS_TYPE, COCKTAILS_TYPE,
  fetchAllMealsAreas, fetchCategories, fetchIngredients,
} from '../services/RecipesAPI';

function ListsProvider({ children }) {
  const [mealsCategories, setMealsCategories] = useState([]);
  const [cocktailsCategories, setCocktailsCategories] = useState([]);
  const [mealsIngredients, setMealsIngredients] = useState([]);
  const [cocktailsIngredients, setCocktailsIngredients] = useState([]);
  const [mealsNationalities, setMealsNationalities] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetch = async () => {
      const [mCat, cCat, mIng, cIng, mNat] = await Promise.all(
        [
          fetchCategories(MEALS_TYPE),
          fetchCategories(COCKTAILS_TYPE),
          fetchIngredients(MEALS_TYPE),
          fetchIngredients(COCKTAILS_TYPE),
          fetchAllMealsAreas(),
        ],
      );

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

  const contextValue = useMemo(() => ({
    categories: pathname.includes('meals') ? mealsCategories : cocktailsCategories,
    ingredients: pathname.includes('meals') ? mealsIngredients : cocktailsIngredients,
    nationalities: mealsNationalities,
  }), [
    pathname,
    cocktailsCategories, cocktailsIngredients,
    mealsCategories, mealsIngredients, mealsNationalities,
  ]);

  return (
    <ListsContext.Provider value={contextValue}>
      {children}
    </ListsContext.Provider>
  );
}

ListsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ListsProvider;
