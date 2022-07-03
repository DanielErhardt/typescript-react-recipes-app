import React from 'react';
import PropTypes from 'prop-types';

function Header({ title }) {
  return (
    <section className="header">
      <h1 className="header-title">{title}</h1>
    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
