import React from 'react';
import Router from 'next/router';

export type WorkoutProps = {
  date: string | null;
  id: number;
  workout: string;
  caloriesBurnt: number | null;
  weight: number | null;
  minutes: number | null;
};

const Meal: React.FC<{ workout: WorkoutProps }> = ({ workout }) => {
  return (
    <div onClick={() => Router.push('/p/[id]', `/p/${workout.id}`)}>
      <h2>Workout: {workout.workout}</h2>
      <h2>Minutes: {workout.minutes}</h2>
      <h3>Weight: {workout.weight}</h3>
      <h3>Calories Burnt: {workout.caloriesBurnt}</h3>
    </div>
  );
};

export default Meal;
