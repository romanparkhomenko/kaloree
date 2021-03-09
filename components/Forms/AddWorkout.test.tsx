import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import AddWorkout from './AddWorkout';

describe('Add Workout Form', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AddWorkout />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('All inputs work and user can submit data', async () => {
    render(<AddWorkout />);

    const workoutInput = screen.getByPlaceholderText('What kind of workout did you do?');
    const minutesInput = screen.getByPlaceholderText('How long did you workout?');
    const caloriesBurntInput = screen.getByPlaceholderText('Calories Burnt');
    const weightInput = screen.getByPlaceholderText('How much weight did you lift?');
    const submitButton = screen.getByText('Log My Workout');

    fireEvent.change(workoutInput, { target: { value: 'Deadlift' } });
    expect(workoutInput).toHaveValue('Deadlift');

    fireEvent.change(minutesInput, { target: { value: '60' } });
    expect(minutesInput).toHaveValue(60);

    fireEvent.change(caloriesBurntInput, { target: { value: '400' } });
    expect(caloriesBurntInput).toHaveValue(400);

    fireEvent.change(weightInput, { target: { value: '200' } });
    expect(weightInput).toHaveValue(200);

    const fakeWeightResponse = { okay: 'workout logged' };

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeWeightResponse),
      });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Confirm success message exists and values are reset
    expect(screen.getByText('Successfully logged Deadlift')).toBeVisible();
    expect(workoutInput).toHaveValue('');
    expect(minutesInput).toHaveValue(null);
    expect(caloriesBurntInput).toHaveValue(null);
    expect(weightInput).toHaveValue(null);
  });
});
