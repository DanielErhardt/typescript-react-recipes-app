import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loadRecipeProgress, saveRecipeProgress } from '../services/LocalStorageManager';

const extractList = (recipe, keyName) => Object.entries(recipe)
  .filter((e) => e[0].includes(keyName))
  .map((m) => m[1])
  .filter((m) => m && m !== ' ') || [];

function IngredientsList({ recipe, onProgressChanged }) {
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const { pathname: path } = useLocation();
  const isInProgressPage = path.includes('progress');

  useEffect(() => {
    setIngredients(extractList(recipe, 'Ingredient'));
    setMeasures(extractList(recipe, 'Measure'));
    setCheckedIngredients(
      loadRecipeProgress(recipe),
    );
  }, [recipe]);


  return (
    <ul style={{
      marginLeft: isInProgressPage ? '0' : '15px',
      listStyle: isInProgressPage ? 'none' : 'square',
    }}
    >
      {isInProgressPage ? (
        ingredients.map((ing, index) => (
          <li key={`ing-${ing}`}>
            <input
              type="checkbox"
              defaultChecked={checkedIngredients.includes(ing)}
              id={`ing${index}`}
              name={ing}
              onChange={onCheckboxClicked}
            />
            <label
              htmlFor={`ing${index}`}
              style={{ textDecoration: checkedIngredients.includes(ing) ? 'line-through' : 'none' }}
            >
            {`${ing}: ${measures[index]}`}
            </label>
          </li>
        ))
      ) : (
        ingredients.map((ing, index) => (
          <li key={`ing-${ing}`}>
            {`${ing}: ${measures[index]}`}
          </li>
        ))
      )}
    </ul>
  );
}

IngredientsList.propTypes = {
  recipe: PropTypes.shape().isRequired,
  onProgressChanged: PropTypes.func.isRequired,
};

export default IngredientsList;
