import React from 'react';
import PropTypes from 'prop-types';

function SidewaysMenu({ options, onOptionClick }) {
  return (
    <nav className="sideways-menu">
      {options.map((o) => (
        <button
          key={`nav-option-${o}`}
          type="button"
          name={o}
          onClick={onOptionClick}
        >
          {o}
        </button>
      ))}
    </nav>
  );
}

SidewaysMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOptionClick: PropTypes.func.isRequired,
};

export default SidewaysMenu;
