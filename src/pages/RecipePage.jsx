import React, {
  useContext, useEffect, useState, useMemo,
} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { fetchRecipeById } from '../services/RecipesAPI';
import IngredientsList from '../components/IngredientsList';
import RecipeCard from '../components/RecipeCard';
import { isRecipeDone, isRecipeInProgress, saveDoneRecipe } from '../services/LocalStorageManager';

// const extractTags = (tags) => {
//   // Regex taken from https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
//   const separator = /(?:,| )+/;
//   if (tags) return tags.split(separator);
//   return [];
// };

function RecipePage() {
  const [finished, setFinished] = useState(false);
  const [recipe, setRecipe] = useState({});
  const { recipeType, recipes, fetchAll } = useContext(RecipesContext);
  const { recipeId } = useParams();
  const { pathname: path } = useLocation();
  const navigate = useNavigate();
  const recommended = useMemo(() => (recipes ? recipes.slice(0, 6) : []), [recipes]);
  const isInProgressPage = path.includes('progress');
  // const recipeTags = extractTags(recipe.strTags);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchRecipeById(recipeType, recipeId);
      setRecipe(data[recipeType][0]);
    };
    fetch();
    fetchAll(true);
  }, []);

  const onProgressChanged = (allChecked) => setFinished(allChecked);

  const finishRecipe = () => {
    saveDoneRecipe(recipe);
    navigate('/done-recipes');
  };

  return (
    <main className="details-page">
      <section className="details-page-section details-header">
        <div className="section-background">
          <img className="details-image" src={recipe.strMealThumb || recipe.strDrinkThumb} alt="Recipe Thumb" />
          <div className="details-name-bar">
            <h1>{recipe.strMeal || recipe.strDrink}</h1>
            {recipe.strAlcoholic ? <p>{`${recipe.strCategory} (${recipe.strAlcoholic})`}</p> : <p>{recipe.strCategory}</p>}
          </div>
        </div>
      </section>
      <section className="details-page-section">
        <h3>Ingredients</h3>
        <div className="section-background padded">
          <IngredientsList recipe={recipe} onProgressChanged={onProgressChanged} />
        </div>
      </section>
      <section className="details-page-section">
        <h3>Instructions</h3>
        <div className="section-background padded">
          <p>{recipe.strInstructions}</p>
        </div>
      </section>
      {!isInProgressPage && (
      <>
        <section className="details-page-section">
          <h3>Video</h3>
        </section>
        <section className="details-page-section">
          <h3>Recommended</h3>
          <div className="horizontal-scroll">
            {recommended.map((r) => (
              <RecipeCard
                key={r.idMeal || r.idDrink}
                recipe={r}
              />
            ))}
          </div>
        </section>
      </>
      )}
      {(isInProgressPage || (!isInProgressPage && !isRecipeDone(recipe))) && (
      <button
        type="button"
        onClick={isInProgressPage ? () => finishRecipe() : () => navigate(`${path}/in-progress`)}
        disabled={isInProgressPage ? !finished : false}
      >
        { !isInProgressPage && (isRecipeInProgress(recipe) ? 'Continue Recipe' : 'Start Recipe') }
        { isInProgressPage && 'Finish Recipe'}
      </button>
      )}
    </main>
  );
}

export default RecipePage;
