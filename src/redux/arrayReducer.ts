import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface parkingData {
    isRegistered: boolean;
    registedNumber: string;
    start: string;
    end: string;
}
interface ParkingDataArray {
    items : parkingData[];
}

const initialState : ParkingDataArray = {
    items:[]
}

const ParkingArraySlice = createSlice({
    name:'parkingArray',
    initialState,
    reducers:{
        AddItemsToParking: ( state, action: PayloadAction<parkingData[]>) => {
            return {
                ...state,
                items: action.payload,
              };
        }
    }
})

export const {AddItemsToParking} = ParkingArraySlice.actions;
export default ParkingArraySlice.reducer;