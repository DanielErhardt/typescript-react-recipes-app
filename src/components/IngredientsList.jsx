import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function IngredientsList({ ingredients, measures }) {
  const { pathname: path } = useLocation();
  const isInProgress = path.includes('progress');

  return (
    <ul style={{ marginLeft: '15px' }}>
      {isInProgress ? (
        ingredients.map((ing, index) => (
          <li key={`ing-${ing}`}>
            {`${ing}: ${measures[index]}`}
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
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IngredientsList;
