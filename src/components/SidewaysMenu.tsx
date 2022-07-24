import React, { MouseEventHandler } from 'react';

interface Props {
  options: string[],
  onOptionClick: MouseEventHandler,
}

function SidewaysMenu({ options, onOptionClick }: Props) {
  return (
    <nav className="sideways-menu">
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
    </nav>
  );
}

export default SidewaysMenu;
