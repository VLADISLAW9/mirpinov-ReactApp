import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const USER_ID_KEY = 'uik'

interface PinIdState {
	userId: any
}

const initialState: PinIdState = {
	userId: JSON.parse(localStorage.getItem(USER_ID_KEY) ?? '0'),
}

export const pinIdSlice = createSlice({
	name: 'id',
	initialState,
	reducers: {
		getUserId(state, action: PayloadAction<number | undefined >) {
			state.userId = action.payload
			localStorage.setItem(USER_ID_KEY, JSON.stringify(state.userId))
		},
	},
})

export const userIdAction = pinIdSlice.actions
export const userIdReducer = pinIdSlice.reducer
