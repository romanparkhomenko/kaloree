import React from 'react';
import Router from 'next/router';

export type MealProps = {
  date: string | null;
  id: number;
  food: string;
  foodCategory: string;
  grams: number | null;
  ounces: number | null;
  calories: number | null;
  // createdAt: Date | null;
};

const Meal: React.FC<{ meal: MealProps }> = ({ meal }) => {
  return (
    <div onClick={() => Router.push('/p/[id]', `/p/${meal.id}`)}>
      <h2>Food: {meal.food}</h2>
      <h2>Category: {meal.foodCategory}</h2>
      <h3>Grams: {meal.grams}</h3>
      <h3>Ounces: {meal.ounces}</h3>
      <h3>Calories: {meal.calories}</h3>
    </div>
  );
};

export default Meal;
