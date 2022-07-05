import React from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import PropTypes from 'prop-types';
import LabeledInput from './inputs/LabeledInput';
import { defaultIconConfig as ic } from '../helpers';

function Header({ title }) {
  const onLabelButtonClick = () => {

  };

  const labelButton = (
    <button
      type="button"
      onClick={onLabelButtonClick}
    >
      <MagnifyingGlass weight={ic.weight} color={ic.color} size={ic.size} />
    </button>
  );

  return (
    <section className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-search-bar">
        <LabeledInput
          label={labelButton}
          type="search"
        />
      </div>
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
