import React from 'react';
import { At } from 'phosphor-react';
import PropTypes from 'prop-types';
import LabeledInput from './LabeledInput';
import { defaultIconConfig as ic } from '../../helpers';

function EmailInputField({ onChange }) {
  return (
    <LabeledInput
      divClassName="email-input"
      label={<At weight={ic.weight} size={ic.size} color={ic.color} />}
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
