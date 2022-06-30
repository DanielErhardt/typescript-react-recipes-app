import React from 'react';
import PropTypes from 'prop-types';

function Header({ title }) {
  return (
    <section>
      <h1>{title}</h1>
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
