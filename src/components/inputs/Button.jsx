import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const {
    className, type, content, disabled, onClick,
  } = props;

  return (
    <button
      className={className}
    /* eslint-disable react/button-has-type */
      type={type}
    /* eslint-enable react/button-has-type */
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

Button.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  className: '',
};

export default Button;
