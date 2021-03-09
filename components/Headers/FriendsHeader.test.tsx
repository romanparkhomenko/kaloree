import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import FriendsHeader from './FriendsHeader';

describe('Friends Page Header', () => {
  const handleFriends = jest.fn();

  it('renders correctly', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const tree = renderer.create(<FriendsHeader handleFriends={handleFriends} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('User can search friend', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<FriendsHeader handleFriends={handleFriends} />);

    const searchInput = screen.getByPlaceholderText('Search name or email');
    const searchButton = screen.getByTestId('searchFriendsButton');

    fireEvent.change(searchInput, { target: { value: 'Roman' } });
    expect(searchInput).toHaveValue('Roman');

    const fakeSearchResponse = [
      {
        id: '1',
        name: 'Roman Parkhomenko',
        email: 'rsparkhomenko@gmail.com',
      },
    ];

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeSearchResponse),
      });
    });

    await act(async () => {
      fireEvent.click(searchButton);
    });

    // Confirm friend results show up
    await waitFor(() => {
      expect(screen.getByText('Add friend')).toBeVisible();
    });
  });

  it('User can add friend', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<FriendsHeader handleFriends={handleFriends} />);

    const searchInput = screen.getByPlaceholderText('Search name or email');
    const searchButton = screen.getByTestId('searchFriendsButton');

    fireEvent.change(searchInput, { target: { value: 'Roman' } });
    expect(searchInput).toHaveValue('Roman');

    const fakeSearchResponse = [
      {
        id: '1',
        name: 'Roman Parkhomenko',
        email: 'rsparkhomenko@gmail.com',
      },
    ];

    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(fakeSearchResponse),
      });
    });

    await act(async () => {
      fireEvent.click(searchButton);
    });

    // Confirm friend results show up
    await waitFor(() => {
      expect(screen.getByText('Add friend')).toBeVisible();
    });

    const addFriendButton = screen.getByText('Add friend');
    await act(async () => {
      fireEvent.click(addFriendButton);
    });

    expect(handleFriends).toHaveBeenCalled();
  });
});
