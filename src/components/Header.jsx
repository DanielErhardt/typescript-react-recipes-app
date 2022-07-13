import React, { useState, useContext } from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import PropTypes from 'prop-types';
import { useKeyPress } from '../hooks/KeyboardEventListeners';
import { defaultIconConfig as ic } from '../helpers';
import RecipesContext from '../context/RecipesContext';
import LabeledInput from './inputs/LabeledInput';

const NAME_FILTER = 'Name';
const INGREDIENT_FILTER = 'Ingredient';
const FIRST_LETTER_FILTER = 'First Letter';
const HEADER_SEARCH_FILTER = 'header-search-filter';
const SEARCH_FILTERS = [NAME_FILTER, INGREDIENT_FILTER, FIRST_LETTER_FILTER];

function Header({ title }) {
  const {
    fetchAll, fetchByName, fetchByIngredient, fetchByFirstLetter,
  } = useContext(RecipesContext);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const onSearchChanged = ({ target: { value } }) => setSearchValue(value);

  const onFilterChanged = ({ target: { id } }) => {
    setSelectedFilter(id);
  };

  const search = () => {
  };

  const clearFilter = () => {
    document.getElementsByName(HEADER_SEARCH_FILTER)
      .forEach((radio) => {
        const ref = radio;
        ref.checked = false;
      });
    setSelectedFilter('');
  };

  const searchButton = (
    <button
      className="search-button"
      type="button"
      onClick={search}
    >
      <MagnifyingGlass weight={ic.weight} color={ic.color} size={ic.size} />
    </button>
  );

  useKeyPress('Enter', () => search());
  useKeyPress('NumpadEnter', () => search());

  return (
    <header>
      <h1 className="header-title">{title}</h1>
      <LabeledInput
        divClassName="input header-search-bar"
        className="search-input"
        type="search"
        name="search"
        value={searchValue}
        onChange={onSearchChanged}
        placeholder="Search Recipe"
        label={searchButton}
        labelToRight
      />

      <div className="header-search-filters">
        {SEARCH_FILTERS.map((filter) => (
          <LabeledInput
            key={`${filter} filter`}
            id={filter}
            type="radio"
            name={HEADER_SEARCH_FILTER}
            label={filter}
            onChange={onFilterChanged}
          />
        ))}

        <button
          type="button"
          onClick={clearFilter}
        >
          Clear
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
