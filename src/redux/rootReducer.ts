import { combineReducers } from '@reduxjs/toolkit';
import ParkingArraySlice from './arrayReducer';

const rootReducer = combineReducers({
    parkingarray: ParkingArraySlice,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;