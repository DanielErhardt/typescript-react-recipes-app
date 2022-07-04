import React from 'react';
import { Password } from 'phosphor-react';
import PropTypes from 'prop-types';
import InputElement from './InputElement';
import { defaultIconConfig as ic } from '../../helpers';

function PasswordInputField({ onChange }) {
  return (
    <InputElement
      divClassName="input password-input"
      icon={<Password weight={ic.weight} size={ic.size} color={ic.color} />}
      name="password"
      type="password"
      placeholder="Password"
      onChange={onChange}
    />
  );
}

PasswordInputField.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default PasswordInputField;
