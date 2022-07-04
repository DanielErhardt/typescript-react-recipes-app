import React from 'react';
import { At, Password } from 'phosphor-react';
import PropTypes from 'prop-types';
import createId from '../../helpers';

function TextInputField(props) {
  const {
    name, onChange, type, label, placeholder,
  } = props;

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
        <input
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

TextInputField.defaultProps = {
  label: '',
  placeholder: '',
  name: '',
  onChange: () => {},
};

TextInputField.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'search']).isRequired,
};

export default TextInputField;
