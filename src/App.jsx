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
    <RecipesProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/foods" element={<MainPage />} />
          <Route exact path="/drinks" element={<MainPage />} />
          <Route path="/foods/:foodId" element={<RecipePage />} />
          <Route path="/drinks/:drinkId" element={<RecipePage />} />
          <Route path="/foods/:foodId/in-progress" element={<RecipePage />} />
          <Route path="/drinks/:drinkId/in-progress" element={<RecipePage />} />
          <Route exact path="/explore" element={<ExplorePage />} />
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
            component={<ExploreByNationalities />}
          />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/done-recipes" element={<UserRecipes />} />
          <Route path="/favorite-recipes" element={<UserRecipes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RecipesProvider>
  );
}

export default App;
