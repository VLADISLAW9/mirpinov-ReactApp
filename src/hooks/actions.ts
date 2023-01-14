import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { pinIdAction } from "../store/data/getPinId.slice"
import { userIdAction } from "../store/data/getUserId.slice"
import { pinsActions } from "../store/data/pins.slice"


const actions = {
	...pinsActions,
	...pinIdAction,
	...userIdAction
}

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}