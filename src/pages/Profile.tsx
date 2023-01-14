import { Avatar, CardMedia } from '@mui/material'
import { Segmented } from 'antd'
import React, { useState } from 'react'
import { useAppSelector } from '../hooks/redux'
import { RiDislikeLine } from 'react-icons/ri'
import { pinsApi } from '../store/data/pinsApi'
import { Link } from 'react-router-dom'
import {FaRegSadCry} from 'react-icons/fa'

const Profile = () => {
	const [value, setValue] = useState<string | number>('Сохраненные')
	const { favourites } = useAppSelector(state => state.favPins)
	const { data: profile } = pinsApi.useFetchProfileDataQuery('')
	const { data: subscriptions } = pinsApi.useFetchSubscriptionsQuery('')
	const {data: myPins} = pinsApi.useFetchMyPinsQuery('')

	console.log(myPins)

	return (
		<div className='mt-16 mb-16 flex flex-col justify-center items-center'>
			<Avatar src={profile?.avatar} sx={{ width: 100, height: 100 }} />
			<h1 className='mt-5 font-normal text-3xl'>{profile?.username}</h1>
			<div className='flex mt-2'>
				<p className=''>0 подписчиков</p>
				<Link to='/subscriptions'>
					<p className='ml-2'>{subscriptions?.length} подписки</p>
				</Link>
			</div>
			<Link to='/profile-edit'>
				<button className='mt-5 bg-gray-200 px-4 py-2 rounded-3xl transition-colors hover:bg-gray-300'>
					Изменить профиль
				</button>
			</Link>

			<Segmented
				className='mt-8'
				options={['Созданные', 'Сохраненные']}
				value={value}
				onChange={setValue}
			/>
			{value === 'Сохраненные' && (
				<div>
					{favourites.length === 0 && (
						<div className='mt-10 flex flex-col justify-center items-center'>
							<RiDislikeLine className='text-gray-300 w-32 h-32' />
							<p className='font-bold mt-3 text-gray-300 text-xl'>
								Нет пинов в избранном
							</p>
						</div>
					)}
					<ul className='pins'>
						{favourites.map(fav => (
							<li className='pins__item' key={fav}>
								<CardMedia
									className='rounded-3xl '
									component='img'
									image={fav}
									alt='Paella dish'
								/>
							</li>
						))}
					</ul>
				</div>
			)}
			{value === 'Созданные' && (
				<div>
					{myPins?.length === 0 && (
						<div className='mt-10 flex flex-col justify-center items-center'>
							<FaRegSadCry className='text-gray-300 w-32 h-32' />
							<p className='font-bold mt-3 text-gray-300 text-xl'>
								Нет созданных пинов
							</p>
						</div>
					)}
					<ul className='pins'>
						{myPins?.map(mypin => (
							<li className='pins__item' key={mypin.id}>
								<CardMedia
									className='rounded-3xl '
									component='img'
									image={mypin.img}
									alt='Paella dish'
								/>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default Profile
