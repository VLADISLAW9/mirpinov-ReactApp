import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const ID_KEY = 'ik'

interface PinIdState {
	pinId: any
}

const initialState: PinIdState = {
	pinId: JSON.parse(localStorage.getItem(ID_KEY) ?? '0'),
	
}

export const pinIdSlice = createSlice({
	name: 'id',
	initialState,
	reducers: {
		getPinId(state, action: PayloadAction<number>) {
			state.pinId = action.payload
			localStorage.setItem(ID_KEY, JSON.stringify(state.pinId))
		},
	},
})

export const pinIdAction = pinIdSlice.actions
export const pinIdReducer = pinIdSlice.reducer
