import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CountriesReduxState  {
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: {
		state: boolean;
		message?: string;
	}
	data: CountryData[] | null;
}

export interface CountryData  {
	updated: number;
	country: string;
	countryInfo: {
		_id: number,
		iso2: string,
		iso3: string,
		lat: number,
		long: number,
		flag: string
	},
	cases: number,
	todayCases: number,
	deaths: number,
	todayDeaths: number,
	recovered: number,
	todayRecovered: number,
	active: number,
	critical: number,
	casesPerOneMillion: number,
	deathsPerOneMillion: number,
	tests: number,
	testsPerOneMillion: number,
	population: number,
	continent: string,
	oneCasePerPeople: number,
	oneDeathPerPeople: number,
	oneTestPerPeople: number,
	activePerOneMillion: number,
	recoveredPerOneMillion: number,
	criticalPerOneMillion: number}

const initialState: CountriesReduxState = {
		loading: "idle",
		error: {
			state: false
		},
		data: null
}



export const fetchCountries = createAsyncThunk("countries", async (props, thunkApi) => {
	const response =  await fetch("https://disease.sh/v3/covid-19/countries")

	return (await response.json()) as CountryData[]

})


export const countriesSlice = createSlice({
	name: "countries",
	initialState,
	reducers: {
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCountries.fulfilled, (state, action) => {
			state.data = action.payload
			state.loading = "succeeded"
		})
	}
})

export const countriesReducer =  countriesSlice.reducer