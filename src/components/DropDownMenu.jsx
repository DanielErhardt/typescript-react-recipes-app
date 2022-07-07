import React from 'react';
import PropTypes from 'prop-types';
import { createId } from '../helpers';

function DropDownMenu({
  label, options, onChange, labelToRight,
}) {
  const id = createId();

  const labelElement = (
    <label htmlFor={id}>
      {label}
    </label>
  );

  return (
    <div className="drop-down-menu">
      {!labelToRight && labelElement}
      <select onChange={onChange}>
        {options.map((option) => (
          <option key={`option-${option}`}>{option}</option>
        ))}
      </select>
      {labelToRight && labelElement}
    </div>
  );
}

DropDownMenu.defaultProps = {
  labelToRight: false,
};

DropDownMenu.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  labelToRight: PropTypes.bool,
};

export default DropDownMenu;
