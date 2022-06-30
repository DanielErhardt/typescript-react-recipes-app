import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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

function App() {
  return (
    <div className="App">
      <RecipesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/foods" component={MainPage} />
            <Route exact path="/drinks" component={MainPage} />
            <Route path="/foods/:foodId" component={RecipePage} />
            <Route path="/drinks/:drinkId" component={RecipePage} />
            <Route path="/foods/:foodId/in-progress" component={RecipePage} />
            <Route path="/drinks/:drinkId/in-progress" component={RecipePage} />
            <Route exact path="/explore" component={ExplorePage} />
            <Route path="/explore/foods" component={ExplorePage} />
            <Route path="/explore/drinks" component={ExplorePage} />
            <Route
              path="/explore/foods/ingredients"
              component={ExploreByIngredients}
            />
            <Route
              path="/explore/drinks/ingredients"
              component={ExploreByIngredients}
            />
            <Route
              path="/explore/foods/nationalities"
              component={ExploreByNationalities}
            />
            <Route path="/profile" component={UserProfile} />
            <Route path="/done-recipes" component={UserRecipes} />
            <Route path="/favorite-recipes" component={UserRecipes} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </RecipesProvider>
    </div>
  );
}

export default App;
