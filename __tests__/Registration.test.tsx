import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import axios from 'axios';
import Home from '../src/Home';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as redux from "react-redux";
import { useDispatch } from 'react-redux';
import { AddItemsToParking } from '../src/redux/arrayReducer';
import Registration from '../src/Registration';
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
    parkingarray :{
        items: [
            {isRegistered: false, registedNumber: '', start: '', end: ''},
            {isRegistered: true, registedNumber: 'ssss', start: '2023-08-18T04:26:02.002Z', end: '2023-08-19T04:26:02.002Z'},
            {isRegistered: true, registedNumber: 'ka40', start: '2023-08-18T04:26:02.002Z', end: '2023-08-18T04:26:04.002Z'}
          ],
    }
}



describe('Parking Booking', () => {
    
  test('It should take input that number of parking slots and add it to the redux store', async () => {
    const store = mockStore(initialState);
    const navigation = { navigate: jest.fn() };
    render(
        <Provider store={store}>
    <Registration navigation={navigation} route={{params: {index: 0}}}/>
    </Provider> 
    );
    const textInput = screen.getByTestId('text-input');
    const submitButton = screen.getByTestId('register-button');
    fireEvent.changeText(textInput,"ka40");
    fireEvent.press(submitButton);
    expect(navigation.navigate).toHaveBeenCalled();
   
    
    
  });

});
