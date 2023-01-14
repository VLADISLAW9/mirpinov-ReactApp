import { Avatar, CardMedia } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useAppSelector } from '../hooks/redux'
import { pinsApi } from '../store/data/pinsApi'

const UserPage = () => {
	const { userId } = useAppSelector(state => state.getUserId)
	const { data: user } = pinsApi.useFetchUserIdPinQuery(userId)
	const { data: pins } = pinsApi.useFetchPinsUserIdQuery(userId)
	const { data: subscriptions } = pinsApi.useFetchSubscriptionsQuery('')
	const [subOnUser, {}] = pinsApi.useSubUserMutation()
	const [unSubUser, {}] = pinsApi.useUnSubMutation()
	const [isSub, setIsSub] = useState(false)
	const handleSub = async () => {
		await subOnUser({
			id: user?.[0].id,
			username: user?.[0].username,
			avatar: user?.[0].avatar,
		})
		setIsSub(true)
		window.location.reload()
	}
	const handleUnSub = () => {
		unSubUser(user?.[0].id)
		setIsSub(false)
		window.location.reload()
	}

	const subCheck = () => {
		if (subscriptions?.length > 0) {
			for (let i = 0; i < subscriptions?.length; i++) {
				if (subscriptions?.[i].username === user?.[0].username) {
					setIsSub(true)
					break
				} else {
					setIsSub(false)
				}
			}
		} else {
			setIsSub(false)
		}
	}

	return (
		<div
			onLoad={subCheck}
			className='mt-16 mb-16 flex flex-col justify-center items-center'
		>
			<Avatar src={user?.[0].avatar} sx={{ width: 100, height: 100 }} />
			<h1 className='mt-5 font-normal text-3xl'>{user?.[0].username}</h1>
			{!isSub && (
				<button
					onClick={handleSub}
					className='mt-5 bg-red-500 text-white px-4 py-2 rounded-3xl transition-colors hover:bg-red-400'
				>
					Подписаться
				</button>
			)}
			{isSub && (
				<button
					onClick={handleUnSub}
					className='mt-5 bg-gray-500 text-white px-5 py-2 rounded-3xl transition-colors hover:bg-gray-400'
				>
					Отписаться
				</button>
			)}
			<h1 className='mt-8'>Созданные</h1>
			<ul className='pins'>
				{pins?.map((pin: any) => (
					<li className='pins__item'>
						<CardMedia
							className='rounded-3xl '
							component='img'
							image={pin.img}
							alt='Paella dish'
						/>
					</li>
				))}
			</ul>
		</div>
	)
}

export default UserPage
