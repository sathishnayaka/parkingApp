import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import axios from 'axios';
import Home from '../src/Home';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {useDispatch} from 'react-redux';
import {AddItemsToParking} from '../src/redux/arrayReducer';
import ParkingSlots from '../src/ParkingLots';
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
      {isRegistered: true, registedNumber: 'ssss', start: '21:00', end: ''},
    ],
  },
};

describe('Parking Booking', () => {
  test('Display the number of parking slots', async () => {
    const store = mockStore(initialState);
    const navigation = {navigate: jest.fn()};
    const mockDispatch = jest.fn();
    render(
      <Provider store={store}>
        <ParkingSlots navigation={navigation} route={{}} />
      </Provider>,
    );
    const parkingSlotButton = screen.getByTestId('parkingPress0');
    fireEvent.press(parkingSlotButton);
    expect(navigation.navigate).toHaveBeenCalled();
    const pricePress = screen.getByTestId('pricepress1');
    fireEvent.press(pricePress);
    expect(navigation.navigate).toHaveBeenCalled();
    const radomButton = screen.getByTestId('random');
    fireEvent.press(radomButton);
  });
});
