import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { pinIdReducer } from './data/getPinId.slice';
import { userIdReducer } from './data/getUserId.slice';
import { pinsReducer } from './data/pins.slice';
import { pinsApi } from "./data/pinsApi";


export const store = configureStore({
	reducer: {
		[pinsApi.reducerPath]: pinsApi.reducer,
		favPins: pinsReducer,
		getPageId: pinIdReducer,
		getUserId: userIdReducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(pinsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>