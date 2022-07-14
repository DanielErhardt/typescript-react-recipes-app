import React, {
  useContext, useEffect, useState, useMemo,
} from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { fetchRecipeById } from '../services/RecipesAPI';
import IngredientsList from '../components/IngredientsList';
import RecipeCard from '../components/RecipeCard';

const extractTags = (tags) => {
  // Regex taken from https://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
  const separator = /(?:,| )+/;
  if (tags) return tags.split(separator);
  return [];
};

const extractList = (recipe, key) => Object.entries(recipe)
  .filter((e) => e[0].includes(key))
  .map((m) => m[1])
  .filter((m) => m && m !== ' ');

function RecipePage() {
  const { recipeType, recipes, fetchAll } = useContext(RecipesContext);
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({ id: recipeId });
  const recommended = useMemo(() => (recipes ? recipes.slice(0, 6) : []), [recipes]);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchRecipeById(recipeType, recipeId);
      const r = data[recipeType][0];
      setRecipe({
        ...recipe,
        name: r.strMeal || r.strDrink,
        thumb: r.strMealThumb || r.strDrinkThumb,
        category: r.strCategory,
        nationality: r.strArea,
        alcoholic: r.strAlcoholic,
        instuctions: r.strInstructions,
        source: r.strSource,
        video: r.strYoutube,
        tags: extractTags(r.strTags),
        ingredients: extractList(r, 'Ingredient'),
        measures: extractList(r, 'Measure'),
      });
    };
    fetch();
    fetchAll(true);
  }, []);

  return (
    <main className="details-page">
      <section className="details-page-section details-header">
        <div className="section-background">
          <img className="details-image" src={recipe.thumb} alt="Recipe Thumb" />
          <div className="details-name-bar">
            <h1>{recipe.name}</h1>
            {recipe.alcoholic ? <p>{`${recipe.category} (${recipe.alcoholic})`}</p> : <p>{recipe.category}</p>}
          </div>
        </div>
      </section>
      <section className="details-page-section">
        <h3>Ingredients</h3>
        <div className="section-background padded">
          <IngredientsList
            ingredients={recipe.ingredients || []}
            measures={recipe.measures || []}
          />
        </div>
      </section>
      <section className="details-page-section">
        <h3>Instructions</h3>
        <div className="section-background padded">
          <p>{recipe.instuctions}</p>
        </div>
      </section>
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
      <button
        type="button"
      >
        Start Recipe
      </button>
    </main>
  );
}

export default RecipePage;
