import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import SummaryHeader from './SummaryHeader';

describe('Summary Page', () => {
  const testMeals = [
    {
      id: 1,
      date: '03/05/2021',
      food: 'blueberries',
      foodCategory: 'fruit',
      grams: 100,
      ounces: 28,
      calories: 200,
    },
    {
      id: 2,
      date: '03/05/2021',
      food: 'blueberries',
      foodCategory: 'fruit',
      grams: 100,
      ounces: 28,
      calories: 200,
    },
  ];

  const testWeights = [
    {
      id: 1,
      date: '03/05/2021',
      pounds: 200,
    },
  ];

  const testUser = {
    id: 1,
    name: 'Roman Parkhomenko',
    email: 'rsparkhomenko@gmail.com',
    caloriegoal: 2000,
    weightgoal: 200,
  };

  const testWorkouts = [
    {
      id: 1,
      date: '03/05/2021',
      workout: 'Deadlift',
      minutes: 60,
      caloriesBurnt: 100,
      weight: 200,
    },
  ];

  it('renders correctly', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // const tree = renderer
    //   .create(
    //     <SummaryHeader
    //       meals={testMeals}
    //       weights={testWeights}
    //       user={testUser}
    //       workouts={testWorkouts}
    //     />,
    //   )
    //   .toJSON();
    // expect(tree).toMatchSnapshot();
    // render(
    //   <SummaryHeader
    //     meals={testMeals}
    //     weights={testWeights}
    //     user={testUser}
    //     workouts={testWorkouts}
    //   />,
    // );
    //
    // expect(screen.findByText('Summary')).toBeVisible();
    // return Promise();
  });
});
