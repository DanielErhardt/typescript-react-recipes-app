import { createContext } from 'react';
import { RecipesContextType } from '../@types';

const RecipesContext = createContext<RecipesContextType | null>(null);

export default RecipesContext;
