import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface HistoricalReduxState  {
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: {
		state: boolean;
		message?: string;
	}
	data: HistoricalCountryData | null;
}
 

export interface HistoricalCountryData  {
	country: string;
	province: string[];
	timeline: {
		cases: Record<string, number>,
		deaths: Record<string, number>,
		recovered: Record<string, number>,
	}
}

const initialState: HistoricalReduxState = {
	loading: "idle",
	error: {
		state: false
	},
	data: null
}


interface props {
	countryCode: string;
	days: number | "all"
}

export const fetchCountryHistoricalData = createAsyncThunk<HistoricalCountryData, props>("historical", async ({countryCode, days}, thunkApi) => {


	const response =  await fetch(`https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=${days}`)

	return (await response.json())

})


export const historicalSlice = createSlice({
	name: "historical",
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCountryHistoricalData.fulfilled, (state, action) => {
			state.data = action.payload
			state.loading = "succeeded"
		})
	}
})

export const historicalReducer =  historicalSlice.reducer