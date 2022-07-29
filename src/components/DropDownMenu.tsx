import React, { ChangeEventHandler } from 'react';
import { createId } from '../helpers';

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
    <div className="drop-down-menu">
      {!labelToRight && labelElement}
      <select onChange={onChange}>
        {options.map((option) => (
          <option key={`option-${option}`}>{option}</option>
        ))}
      </select>
      {labelToRight && labelElement}
    </div>
  );
}

DropDownMenu.defaultProps = {
  labelToRight: false,
};

export default DropDownMenu;
