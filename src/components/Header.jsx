import React, { useState } from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import PropTypes from 'prop-types';
import { defaultIconConfig as ic } from '../helpers';
import LabeledInput from './inputs/LabeledInput';

function Header({ title }) {
  const [searchValue, setSearchValue] = useState('');

  const onSearchChanged = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const search = () => {
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
    <section className="header">
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
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
