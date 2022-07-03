import React from 'react';
import PropTypes from 'prop-types';
import createId from '../Helpers/HelperFunctions';

function InputField({ type, label, placeholder }) {
  const id = createId();

  return (
    <div className="input-field-component">
      <label htmlFor={id}>
        {`${label} `}
        <input id={id} type={type} placeholder={placeholder} />
      </label>
    </div>
  );
}

InputField.defaultProps = {
  label: '',
  placeholder: '',
};

InputField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default InputField;
