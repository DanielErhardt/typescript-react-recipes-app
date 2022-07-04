import React from 'react';
import PropTypes from 'prop-types';
import { createId } from '../../helpers';

const allowedTypes = ['text', 'email', 'password', 'search', 'checkbox', 'radio'];

function InputElement(props) {
  const {
    id, label, labelToRight, icon, type, name, divClassName, placeholder, onChange, defaultChecked,
  } = props;

  if (!allowedTypes.includes(type)) {
    throw new Error(`The InputElement component does not work currently with the ${type} type.`);
  }

  const thisId = id || createId();

  const renderLabel = () => {
    const content = label || icon ? label || icon : '';
    return (
      <label htmlFor={thisId}>
        {content}
      </label>
    );
  };

  return (
    <div className={`${divClassName}`}>
      {!labelToRight && renderLabel()}
      <input
        id={thisId}
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        defaultChecked={defaultChecked}
      />
      {labelToRight && renderLabel()}
    </div>
  );
}

InputElement.defaultProps = {
  id: '',
  label: '',
  labelToRight: false,
  icon: undefined,
  name: '',
  divClassName: '',
  placeholder: '',
  onChange: () => {},
  defaultChecked: false,
};

InputElement.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  labelToRight: PropTypes.bool,
  icon: PropTypes.element,
  type: PropTypes.oneOf(allowedTypes).isRequired,
  name: PropTypes.string,
  divClassName: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
};

export default InputElement;
