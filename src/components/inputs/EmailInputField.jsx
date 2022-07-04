import React from 'react';
import { At } from 'phosphor-react';
import PropTypes from 'prop-types';
import InputElement from './InputElement';
import { defaultIconConfig as ic } from '../../helpers';

function EmailInputField({ onChange }) {
  return (
    <InputElement
      divClassName="input email-input"
      icon={<At weight={ic.weight} size={ic.size} color={ic.color} />}
      name="email"
      type="email"
      placeholder="Email"
      onChange={onChange}
    />
  );
}

EmailInputField.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default EmailInputField;
