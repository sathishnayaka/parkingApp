import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import axios from 'axios';
import Home from '../src/Home';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as redux from "react-redux";
import { useDispatch } from 'react-redux';
import { AddItemsToParking } from '../src/redux/arrayReducer';
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
        items :[]
    }
}



describe('Parking Booking', () => {
    
  test('It should take input that number of parking slots and add it to the redux store', async () => {
    const store = mockStore(initialState);
    const navigation = { navigate: jest.fn() };
    const mockDispatch = jest.fn();
    render(
        <Provider store={store}>
    <Home navigation={navigation} />
    </Provider> 
    );
    const textInput = screen.getByTestId('text-input');
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.changeText(textInput,5);
    fireEvent.press(submitButton);
    // const mockDispatcher = jest.fn();
    // (useDispatch as jest.Mock).mockReturnValue(mockDispatcher);
    // expect(mockDispatcher).toHaveBeenCalled();
    //  const expectedAction = AddItemsToParking([{isRegistered: false,
    //     registedNumber:"",
    //     start: "",
    //     end: ""}]);
    // expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    
    
  });

});
