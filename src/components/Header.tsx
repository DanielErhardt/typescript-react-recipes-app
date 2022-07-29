import React, {
  useState, useContext, MouseEvent, KeyboardEvent,
} from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import { defaultIconConfig as ic } from '../helpers';
import RecipesContext from '../context/RecipesContext';
import LabeledInput from './LabeledInput';
import SidewaysMenu from './SidewaysMenu';
import {
  fetchAllRecipes, fetchRecipesByFirstLetter, fetchRecipesByName,
  fetchRecipesByIngredient, fetchRecipesByCategory,
} from '../services/RecipesAPI';
import { RecipesContextType } from '../@types';

const INGREDIENT_FILTER = 'Ingredient';
const FIRST_LETTER_FILTER = 'First Letter';
const HEADER_SEARCH_FILTER = 'header-search-filter';
const SEARCH_FILTERS = [INGREDIENT_FILTER, FIRST_LETTER_FILTER];

type Props = {
  title: string;
  showSearchBar?: boolean;
};

function Header({ title, showSearchBar }: Props): JSX.Element {
  const {
    categories, updateRecipes, getRecipeType,
  } = useContext<RecipesContextType>(RecipesContext);
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  const search = async () => {
    switch (selectedFilter) {
      case INGREDIENT_FILTER:
        updateRecipes(await fetchRecipesByIngredient(getRecipeType(), searchValue));
        break;
      case FIRST_LETTER_FILTER:
        if (searchValue.length !== 1) {
          window.alert('A search with this filter must contain only one character.'); // eslint-disable-line
        } else if (!searchValue.match(/[a-z]/i)) {
          window.alert('A search with this filter must be a letter.'); // eslint-disable-line
        } else {
          updateRecipes(await fetchRecipesByFirstLetter(getRecipeType(), searchValue));
        }
        break;
      default:
        if (searchValue) updateRecipes(await fetchRecipesByName(getRecipeType(), searchValue));
        else updateRecipes(await fetchAllRecipes(getRecipeType()));
        break;
    }
  };

  const onOptionClick = ({ currentTarget: { name } }: MouseEvent<HTMLButtonElement>) => {
    fetchRecipesByCategory(getRecipeType(), name);
  };

  const onSearchChanged = ({ currentTarget: { value } }: KeyboardEvent<HTMLInputElement>) => setSearchValue(value);

  const onFilterChanged = ({ currentTarget: { id } }: KeyboardEvent<HTMLInputElement>) => {
    setSelectedFilter(id);
  };

  const onEnterPressed = ({ code } : KeyboardEvent<HTMLInputElement>) => {
    if (code === 'Enter' || code === 'NumpadEnter') { search(); }
  };

  const clearFilter = () => {
    document.getElementsByName(HEADER_SEARCH_FILTER)
      .forEach((radio) => {
        const ref = radio as HTMLInputElement;
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

  return (
    <header>
      <h1 className="header-title">{title}</h1>
      {showSearchBar && (
        <>
          <LabeledInput
            parentClassName="input header-search-bar"
            className="search-input"
            type="search"
            name="search"
            value={searchValue}
            onChange={onSearchChanged}
            onKeyDown={onEnterPressed}
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
        </>
      )}
      <SidewaysMenu options={categories} onOptionClick={onOptionClick} />
    </header>
  );
}

Header.defaultProps = {
  showSearchBar: false,
};

export default Header;
