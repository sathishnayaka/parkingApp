import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import axios from 'axios';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Price from '../src/Price';
jest.mock('axios');

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();

// Mocking the actual useDispatch function
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const mockStore = configureStore();

const initialState = {
  parkingarray: {
    items: [
      {isRegistered: false, registedNumber: '', start: '', end: ''},
      {isRegistered: true, registedNumber: 'ssss', start: '2023-08-18T04:26:02.002Z', end: '2023-08-19T04:26:02.002Z'},
      {isRegistered: true, registedNumber: 'ka40', start: '2023-08-18T04:26:02.002Z', end: '2023-08-18T04:26:04.002Z'}
    ],
  },
};

describe('Parking Booking', () => {
  test('it should display the price for the given time', async () => {
    const store = mockStore(initialState);
    const navigation = {navigate: jest.fn()};
    const mockAxios = (axios.get as jest.Mock).mockImplementation(() =>
    Promise.resolve({status : 200})
  );
    render(
      <Provider store={store}>
        <Price navigation={navigation} route={{params: {index: 2}}} />
      </Provider>,
    );
    const priceButton = screen.getByTestId('pay-button');
    fireEvent.press(priceButton);
    await waitFor(() => {expect(axios.get).toHaveBeenCalled()})
  });
  
  it("it should show error message when api fail",async () => {
    const store = mockStore(initialState);
    const navigation = {navigate: jest.fn(),goBack: jest.fn()};
    const axiosMock = axios as jest.Mocked<typeof axios>;
    axiosMock.get.mockRejectedValueOnce(new Error('API request failed'));
    render(
      <Provider store={store}>
        <Price navigation={navigation} route={{params: {index: 2}}} />
      </Provider>,
    );
    const priceButton = screen.getByTestId('pay-button');
    fireEvent.press(priceButton);
    const backButton = screen.getByTestId('backButton');
    fireEvent.press(backButton);
    expect(navigation.goBack).toHaveBeenCalled();
  })
});
