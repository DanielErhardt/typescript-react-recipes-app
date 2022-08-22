import React, { useContext, useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import RecipesContext from '../context/RecipesContext';
import { fetchRecipeById, fetchAllRecipes } from '../services/RecipesAPI';
import IngredientsList from '../components/IngredientsList';
import RecipeCard from '../components/RecipeCard';
import Recipe from '../classes/Recipe';
import StyleWrapper from '../styles/pages/RecipePage.styled';
import HorizontalScrollWrapper from '../styles/components/HorizontalScroll.styled';

function RecipePage(): JSX.Element {
  const [finished, setFinished] = useState<boolean>(false);
  const [recipe, setRecipe] = useState<Recipe>(new Recipe());
  const {
    recipes, updateRecipes, getRecipeType, resetRecipes,
  } = useContext(RecipesContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const getRecommended = (): Recipe[] => (recipes ? recipes.slice(0, 6) : []);
  const isInProgressPage: boolean = pathname.includes('progress');

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchRecipeById(getRecipeType(), id || '');

      // TODO fix: this getRecipeType is also being inverted, and it shouldn't
      // Create getInvertedRecipeType on RecipesProvider

      setRecipe(new Recipe(data[getRecipeType()][0]));
      updateRecipes(await fetchAllRecipes(getRecipeType(true)));
    };
    fetch();

    return () => {
      resetRecipes();
    };
  }, []);

  const finishRecipe = (): void => {
    navigate('/done-recipes');
  };

  return (
    <StyleWrapper>
      <section className="header">
        <div>
          <img src={recipe.thumb} alt="Recipe Thumb" />
          <div className="recipe-name-bar">
            <h1>{recipe.name}</h1>
            {recipe.alcoholic ? <p>{`${recipe.category} (${recipe.alcoholic})`}</p> : <p>{recipe.category}</p>}
          </div>
        </div>
      </section>
      <section>
        <h3>Ingredients</h3>
        <div className="padded">
          <IngredientsList recipe={recipe} setFinished={setFinished} />
        </div>
      </section>
      <section>
        <h3>Instructions</h3>
        <div className="padded">
          <p>{recipe.instructions}</p>
        </div>
      </section>
      {!isInProgressPage && (
      <>
        <section>
          <h3>Video</h3>
          <ReactPlayer width="100%" height="100%" url={recipe.youtubeLink} />
        </section>
        <section>
          <h3>Recommended</h3>
          <HorizontalScrollWrapper>
            {getRecommended().map((r) => (
              <RecipeCard
                key={r.id}
                recipe={r}
              />
            ))}
          </HorizontalScrollWrapper>
        </section>
      </>
      )}
      {(isInProgressPage || (!isInProgressPage && !recipe.isDone())) && (
      <button
        type="button"
        onClick={isInProgressPage ? () => finishRecipe() : () => navigate(`${pathname}/in-progress`)}
        disabled={isInProgressPage ? !finished : false}
      >
        { !isInProgressPage && (recipe.isInProgress() ? 'Continue Recipe' : 'Start Recipe') }
        { isInProgressPage && 'Finish Recipe'}
      </button>
      )}
    </StyleWrapper>
  );
}

export default RecipePage;
