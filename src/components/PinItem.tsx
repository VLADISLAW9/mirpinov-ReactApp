import React, { FC, useState } from 'react'
import { IPins } from '../models/IPins'
import CardMedia from '@mui/material/CardMedia'
import { Avatar, Button, IconButton } from '@mui/material'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { MdOutlineFavorite } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { pinsApi } from '../store/data/pinsApi'
import { IUsers } from '../models/IUsers'

interface PinItemProps {
	pin: IPins
}

const PinItem: FC<PinItemProps> = ({ pin }) => {
	const [hover, setHover] = useState(false)
	const { data: myProfile } = pinsApi.useFetchProfileDataQuery('')
	const { data: user } = pinsApi.useFetchUserPinQuery(pin.userId)
	const { getPinId, getUserId } = useActions()

	const handleGetId = () => {
		getPinId(pin.id)
		getUserId(user?.[0].id)
	}
	const { addFavourite, removeFavourite } = useActions()
	const { favourites } = useAppSelector(state => state.favPins)
	const [isFav, setIsFav] = useState(favourites.includes(pin.img))

	const addToFav = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		addFavourite(pin.img)
		setIsFav(true)
	}
	const removeToFav = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		removeFavourite(pin.img)
		setIsFav(false)
	}
	const handleMouseEnter = () => {
		setHover(true)
	}
	const handleMouseLeave = () => {
		setHover(false)
	}
	const handleUser = () => {
		getUserId(user?.[0].id)
	}

	if (pin.myPin === true) {
		return (
			<li
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className='pins__item'
			>
				<Link onClick={handleGetId} className='' to={`/pin/${pin.id}`}>
					<CardMedia
						className='rounded-3xl hover:opacity-90 cursor-pointer transition-all'
						component='img'
						image={pin.img}
						alt='Paella dish'
					/>
				</Link>

				<div className='px-1'>
					<h3 className='font-semibold'>{pin.title}</h3>
					<div className='flex justify-between items-center mt-1'>
						<Link onClick={handleUser} to={`/profile`}>
							<div className='flex items-center'>
								<Avatar
									src={myProfile?.avatar}
									sx={{ width: 32, height: 32 }}
								/>
								<p className='ml-2'>{myProfile?.username}</p>
							</div>
						</Link>
					</div>
				</div>
			</li>
		)
	} else {
		return (
			<li
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className='pins__item'
			>
				<Link onClick={handleGetId} className='' to={`/pin/${pin.id}`}>
					<CardMedia
						className='rounded-3xl hover:opacity-90 cursor-pointer transition-all'
						component='img'
						image={pin.img}
						alt='Paella dish'
					/>
				</Link>

				<div className='px-1'>
					<h3 className='font-semibold'>{pin.title}</h3>
					<div className='flex justify-between items-center mt-1'>
						<Link onClick={handleUser} to={`/user/${user?.[0].id}`}>
							<div className='flex items-center'>
								<Avatar src={user?.[0].avatar} sx={{ width: 32, height: 32 }} />
								<p className='ml-2'>{user?.[0].username}</p>
							</div>
						</Link>

						<div>
							<IconButton>
								{!isFav && (
									<button className='' onClick={addToFav}>
										<MdOutlineFavoriteBorder className='w-6 h-6  ' />
									</button>
								)}
								{isFav && (
									<button className='' onClick={removeToFav}>
										<MdOutlineFavorite className='w-6 h-6 text-red-500' />
									</button>
								)}
							</IconButton>
						</div>
					</div>
				</div>
			</li>
		)
	}
}

export default PinItem
