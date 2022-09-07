import { IconWeight } from 'phosphor-react';
import { APIRecipeType } from '../@types';
import { MEALS_TYPE, DRINKS_TYPE } from '../services/RecipesAPI';

export const getRecipeType = (r: APIRecipeType): string => (r.idMeal ? MEALS_TYPE : DRINKS_TYPE);

export const createId = (length: number = 8): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const defaultIconConfig = {
  weight: 'bold' as IconWeight,
  size: '24px',
  color: 'black',
};
