import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const LS_FAV_KEY = 'rfk'

interface PinsState{
	favourites: string []
}

const initialState: PinsState = {
	favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]'),
}

export const pinsSlice = createSlice({
	name: "pin",
	initialState,
	reducers: {
		addFavourite(state, action: PayloadAction<string>) {
			state.favourites.push(action.payload)
			localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
		},	
		removeFavourite(state, action: PayloadAction<string>) {
			state.favourites = state.favourites.filter(f => f !== action.payload)
			localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites))
		}
	}
})

export const pinsActions = pinsSlice.actions
export const pinsReducer = pinsSlice.reducer