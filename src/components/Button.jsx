import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const {
    type, text, onClick, disabled,
  } = props;
  return (
    <button
    /* eslint-disable react/button-has-type */
      type={type || 'button'}
    /* eslint-enable react/button-has-type */
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
};

export default Button;
