import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import ListsProvider from './context/ListsProvider';
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
    <ListsProvider>
      <RecipesProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/meals" element={<MainPage />} />
            <Route exact path="/cocktails" element={<MainPage />} />
            <Route path="/meals/:mealId" element={<RecipePage />} />
            <Route path="/cocktails/:cocktailId" element={<RecipePage />} />
            <Route path="/meals/:mealId/in-progress" element={<RecipePage />} />
            <Route path="/cocktails/:cocktailId/in-progress" element={<RecipePage />} />
            <Route exact path="/explore" element={<ExplorePage />} />
            <Route path="/explore/meals" element={<ExplorePage />} />
            <Route path="/explore/cocktails" element={<ExplorePage />} />
            <Route
              path="/explore/meals/ingredients"
              element={<ExploreByIngredients />}
            />
            <Route
              path="/explore/cocktails/ingredients"
              element={<ExploreByIngredients />}
            />
            <Route
              path="/explore/meals/nationalities"
              component={<ExploreByNationalities />}
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/done-recipes" element={<UserRecipes />} />
            <Route path="/favorite-recipes" element={<UserRecipes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RecipesProvider>
    </ListsProvider>
  );
}

export default App;
