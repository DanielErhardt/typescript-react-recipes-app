import React from 'react';
import { At, Password } from 'phosphor-react';
import PropTypes from 'prop-types';
import createId from '../Helpers/HelperFunctions';

function InputField({ type, label, placeholder }) {
  const id = createId();

  const renderIcon = () => {
    const config = {
      weight: 'bold',
      size: '24px',
      color: 'black',
    };

    switch (type) {
      case 'email':
        return (
          <At
            weight={config.weight}
            size={config.size}
            color={config.color}
          />
        );

      case 'password':
        return (
          <Password
            weight={config.weight}
            size={config.size}
            color={config.color}
          />
        );

      default:
        return ('');
    }
  };

  return (
    <div className="input-field-component">
      {label === '' && renderIcon()}
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
