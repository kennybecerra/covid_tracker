import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type CountryData } from "./countries";

export interface CountryReduxState  {
	error: {
		state: boolean;
		message?: string;
	}
	data: CountryData | null;
}


const initialState: CountryReduxState = {
		error: {
			state: false
		},
		data: null
}



export const countrySlice = createSlice({
	name: "country",
	initialState,
	reducers: {
		selectCountryData(state, action: PayloadAction<CountryData>) {
			state.data = action.payload
		}
	},

})

export const countryReducer =  countrySlice.reducer
export const { selectCountryData} = countrySlice.actions