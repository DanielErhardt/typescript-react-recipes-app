import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { createId } from '../helpers';
import StyleWrapper from '../styles/components/LabeledInput.styled';

const allowedTypes: (string | undefined)[] = ['number', 'text', 'email', 'password', 'search', 'checkbox', 'radio'];

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: JSX.Element | string | undefined;
  labelToRight?: boolean;
};

function LabeledInput({
  id, name, type, value, placeholder, defaultChecked,
  onKeyDown, onChange,
  label, labelToRight,
}: Props): JSX.Element {
  if (!allowedTypes.includes(type)) {
    throw new Error(`The InputElement component does not work currently with the ${type} type.`);
  }

  const thisId = id || createId();

  const labelElement = (
    <label htmlFor={thisId}>
      {label}
    </label>
  );

  return (
    <StyleWrapper>
      {!labelToRight && labelElement}
      <input
        id={thisId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        defaultChecked={defaultChecked}
      />
      {labelToRight && labelElement}
    </StyleWrapper>
  );
}

LabeledInput.defaultProps = {
  labelToRight: false,
};

export default LabeledInput;
