import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { createId } from '../helpers';

const allowedTypes: (string | undefined)[] = ['number', 'text', 'email', 'password', 'search', 'checkbox', 'radio'];

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: JSX.Element | string | undefined;
  parentClassName?: string;
  labelToRight?: boolean;
};

function LabeledInput({
  id, name, type, value, className, placeholder, defaultChecked,
  onKeyDown, onChange,
  label, labelToRight, parentClassName,
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
    <div className={`labeled-input ${parentClassName}`}>
      {!labelToRight && labelElement}
      <input
        style={{ margin: '0 3px' }}
        className={className}
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
    </div>
  );
}

LabeledInput.defaultProps = {
  parentClassName: '',
  labelToRight: false,
};

export default LabeledInput;
