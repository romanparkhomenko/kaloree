import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import AddWeight from './AddWeight';

describe('Add Weight Form', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<AddWeight />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('All inputs work and user can submit data', async () => {
    render(<AddWeight />);

    const weightInput = screen.getByPlaceholderText('How much do you weigh?');
    const submitButton = screen.getByText('Log My Weight');

    fireEvent.change(weightInput, { target: { value: '200' } });
    expect(weightInput).toHaveValue(200);

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
    expect(screen.getByText('Successfully logged weight')).toBeVisible();
    expect(weightInput).toHaveValue(null);
  });
});
