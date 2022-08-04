import React, { ChangeEvent, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Recipe from '../classes/Recipe';

type Props = {
  recipe: Recipe;
  setFinished: (recipeFinished: boolean) => void;
};

function IngredientsList({ recipe, setFinished } : Props) {
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const { pathname: path } = useLocation();
  const isInProgressPage = path.includes('progress');

  useEffect(() => {
    setCheckedIngredients(recipe.getCheckedIngredients() || []);
  }, []);

  const onCheckboxClicked = ({ currentTarget: { name, checked } }: ChangeEvent<HTMLInputElement>) => {
    recipe.checkIngredient(name, checked);
    setCheckedIngredients(recipe.getCheckedIngredients() || []);
    setFinished(recipe.isDone() || false);
  };

  const isIngredientChecked = (ingredient: string): boolean => checkedIngredients.includes(ingredient);

  return (
    <ul style={{
      marginLeft: isInProgressPage ? '0' : '15px',
      listStyle: isInProgressPage ? 'none' : 'square',
    }}
    >
      {isInProgressPage ? (
        recipe.ingredients.map((ing, index) => (
          // this eslint disable is necessary because there are recipes with repeated ingredients
          // eslint-disable-next-line react/no-array-index-key
          <li key={`ing-${ing.name}${index}`}>
            <input
              type="checkbox"
              defaultChecked={isIngredientChecked(ing.name)}
              id={`ing${index}`}
              name={ing.name}
              onChange={onCheckboxClicked}
            />
            <label
              htmlFor={`ing${index}`}
              style={{ textDecoration: isIngredientChecked(ing.name) ? 'line-through' : 'none' }}
            >
              {`${ing.name}: ${ing.measure}`}
            </label>
          </li>
        ))
      ) : (
        recipe.ingredients.map((ing, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`ing-${ing.name}${index}`}>
            {`${ing.name}: ${ing.measure}`}
          </li>
        ))
      )}
    </ul>
  );
}

export default IngredientsList;
