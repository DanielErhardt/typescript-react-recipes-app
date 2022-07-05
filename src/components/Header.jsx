import React from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import PropTypes from 'prop-types';
import { defaultIconConfig as ic } from '../helpers';

function Header({ title }) {
  const onLabelButtonClick = () => {

  };
  return (
    <section className="header">
      <h1 className="header-title">{title}</h1>

      <div className="input">
        <button
          className="icon-button"
          type="button"
          onClick={onLabelButtonClick}
        >
          <MagnifyingGlass weight={ic.weight} color={ic.color} size={ic.size} />
        </button>
        <input
          className="search-input"
          type="search"
          placeholder="Search Recipe"
        />
      </div>

    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
