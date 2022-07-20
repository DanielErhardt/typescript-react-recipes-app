import React, { useState, useContext } from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import PropTypes from 'prop-types';
import { useKeyPress } from '../hooks/KeyboardEventListeners';
import { defaultIconConfig as ic } from '../helpers';
import RecipesContext from '../context/RecipesContext';
import ListsContext from '../context/ListsContext';
import LabeledInput from './inputs/LabeledInput';
import ModalWindow from './ModalWindow';

const INGREDIENT_FILTER = 'Ingredient';
const FIRST_LETTER_FILTER = 'First Letter';
const HEADER_SEARCH_FILTER = 'header-search-filter';
const SEARCH_FILTERS = [INGREDIENT_FILTER, FIRST_LETTER_FILTER];

function Header({ title }) {
  const {
    fetchAll, fetchByName, fetchByIngredient, fetchByFirstLetter,
  } = useContext(RecipesContext);
  const { categories } = useContext(ListsContext);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const onSearchChanged = ({ target: { value } }) => setSearchValue(value);

  const onFilterChanged = ({ target: { id } }) => {
    setSelectedFilter(id);
  };

  const search = () => {
    switch (selectedFilter) {
      case INGREDIENT_FILTER:
        fetchByIngredient(searchValue);
        break;
      case FIRST_LETTER_FILTER:
        if (searchValue.length !== 1) setModalMessage('A search with this filter must contain only one character.');
        else if (!searchValue.match(/[a-z]/i)) setModalMessage('A search with this filter must be a letter.');
        else fetchByFirstLetter(searchValue);
        break;
      default:
        if (searchValue) fetchByName(searchValue);
        else fetchAll();
        break;
    }
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
      <ModalWindow message={modalMessage} onClose={() => setModalMessage('')} />
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
