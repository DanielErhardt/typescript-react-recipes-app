import React, { ChangeEventHandler } from 'react';
import { createId } from '../helpers';
import StyleWrapper from '../styles/components/DropDownMeny.styled';

type Props = {
  label: string | undefined;
  options: string[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  labelToRight?: boolean;
}

function DropDownMenu({
  label, options, onChange, labelToRight,
}: Props): JSX.Element {
  const id = createId();

  const labelElement: JSX.Element = (
    <label htmlFor={id}>
      {label}
    </label>
  );

  return (
    <StyleWrapper>
      {!labelToRight && labelElement}
      <select onChange={onChange}>
        {options.map((option) => (
          <option key={`option-${option}`}>{option}</option>
        ))}
      </select>
      {labelToRight && labelElement}
    </StyleWrapper>
  );
}

DropDownMenu.defaultProps = {
  labelToRight: false,
};

export default DropDownMenu;
