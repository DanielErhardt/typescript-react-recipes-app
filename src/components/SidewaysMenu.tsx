import React, { MouseEventHandler } from 'react';
import StyleWrapper from '../styles/components/SidewaysMenu.styled';

interface Props {
  options: string[],
  onOptionClick: MouseEventHandler,
}

function SidewaysMenu({ options, onOptionClick }: Props): JSX.Element {
  return (
    <StyleWrapper>
      {options.map((o) => (
        <button
          key={`nav-option-${o}`}
          type="button"
          name={o}
          onClick={onOptionClick}
        >
          {o}
        </button>
      ))}
    </StyleWrapper>
  );
}

export default SidewaysMenu;
