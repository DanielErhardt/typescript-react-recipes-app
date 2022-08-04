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
          <Route path="/foods" element={<MainPage />} />
          <Route path="/drinks" element={<MainPage />} />
          <Route path="/foods/:id" element={<RecipePage />} />
          <Route path="/drinks/:id" element={<RecipePage />} />
          <Route path="/foods/:id/in-progress" element={<RecipePage />} />
          <Route path="/drinks/:id/in-progress" element={<RecipePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/foods" element={<ExplorePage />} />
          <Route path="/explore/drinks" element={<ExplorePage />} />
          <Route
            path="/explore/foods/ingredients"
            element={<ExploreByIngredients />}
          />
          <Route
            path="/explore/drinks/ingredients"
            element={<ExploreByIngredients />}
          />
          <Route
            path="/explore/foods/nationalities"
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
