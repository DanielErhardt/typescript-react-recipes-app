import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainPage() {
  return (
    <div className="page-wrapper">
      <Header title="Recipes" />
      <div className="page-content main-page-content">
        Main Page
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
