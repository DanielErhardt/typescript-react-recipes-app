import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import MainPage from './pages/MainPage';
import RecipePage from './pages/RecipePage';
import ExplorePage from './pages/ExplorePage';
import ExploreByIngredients from './pages/ExploreByIngredients';
import ExploreByNationalities from './pages/ExploreByNationalities';
import UserRecipes from './pages/UserRecipes';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/meals" element={<MainPage />} />
          <Route path="/drinks" element={<MainPage />} />
          <Route path="/meals/:id" element={<RecipePage />} />
          <Route path="/drinks/:id" element={<RecipePage />} />
          <Route path="/meals/:id/in-progress" element={<RecipePage />} />
          <Route path="/drinks/:id/in-progress" element={<RecipePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/meals" element={<ExplorePage />} />
          <Route path="/explore/drinks" element={<ExplorePage />} />
          <Route
            path="/explore/meals/ingredients"
            element={<ExploreByIngredients />}
          />
          <Route
            path="/explore/drinks/ingredients"
            element={<ExploreByIngredients />}
          />
          <Route
            path="/explore/meals/nationalities"
            element={<ExploreByNationalities />}
          />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/done-recipes" element={<UserRecipes />} />
          <Route path="/favorite-recipes" element={<UserRecipes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
