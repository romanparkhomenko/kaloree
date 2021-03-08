import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import AddMeal from './AddMeal';

describe('Add Meal Form', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AddMeal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('All inputs work and user can submit data', async () => {
    render(<AddMeal />);

    const foodInput = screen.getByPlaceholderText('What did you eat?');
    const categoryInput = screen.getByPlaceholderText('Carbs, Fruit, Fats...');
    const gramsInput = screen.getByPlaceholderText('Grams');
    const ouncesInput = screen.getByPlaceholderText('Ounces');
    const caloriesInput = screen.getByPlaceholderText('Calories');
    const submitButton = screen.getByText('Log My Meal');

    fireEvent.change(foodInput, { target: { value: 'Bananas' } });
    expect(foodInput).toHaveValue('Bananas');

    fireEvent.change(categoryInput, { target: { value: 'Fruit' } });
    expect(categoryInput).toHaveValue('Fruit');

    // Ensure conversion occurs between grams and ounces
    fireEvent.change(gramsInput, { target: { value: '28.35' } });
    expect(gramsInput).toHaveValue(28.35);
    expect(ouncesInput).toHaveValue(1.0);

    fireEvent.change(ouncesInput, { target: { value: '3.00' } });
    expect(ouncesInput).toHaveValue(3.0);
    expect(gramsInput).toHaveValue(85.05);

    fireEvent.change(caloriesInput, { target: { value: '300' } });
    expect(caloriesInput).toHaveValue(300);

    const fakeWeightResponse = { okay: 'weight logged' };

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeWeightResponse),
      });
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Confirm success message exists and values are reset
    expect(screen.getByText('Successfully logged Bananas')).toBeVisible();
    expect(foodInput).toHaveValue('');
    expect(categoryInput).toHaveValue('');
    expect(gramsInput).toHaveValue(null);
    expect(ouncesInput).toHaveValue(null);
    expect(caloriesInput).toHaveValue(null);
  });
});
