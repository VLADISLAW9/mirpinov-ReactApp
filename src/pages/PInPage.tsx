import { Avatar, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { pinsApi } from '../store/data/pinsApi'
import { MdExpandMore } from 'react-icons/md'
import { IComments } from '../models/IComments'
import { Link } from 'react-router-dom'

const PinPage: React.FC = () => {
	const { pinId } = useAppSelector(state => state.getPageId)
	const { userId } = useAppSelector(state => state.getUserId)
	const { data } = pinsApi.useFetchPinIdQuery(pinId)
	const { data: comments } = pinsApi.useFetchCommentsPinIdQuery(pinId)
	const { data: user } = pinsApi.useFetchUserIdPinQuery(userId)
	const { addFavourite, removeFavourite } = useActions()
	const { data: myProfile } = pinsApi.useFetchProfileDataQuery('')
	const { favourites } = useAppSelector(state => state.favPins)
	const [isFav, setIsFav] = useState(favourites.includes(data?.img))
	const [open, setOpen] = useState(false)
	const [createComments, {}] = pinsApi.useCreateCommentsMutation()
	const [comment, setComment] = useState('')
	const { getUserId } = useActions()

	const handleUser = () => {
		getUserId(user?.[0].id)
	}

	const handleChange = (e: any) => {
		setComment(e.target.value)
	}

	const handleCreate = async (e: any) => {
		e.preventDefault()
		await createComments({
			pinId: pinId,
			username: 'Vlad',
			title: comment,
		} as IComments)
		setComment('')
	}

	const handleClick = () => {
		setOpen(prev => !prev)
	}
	const addToFav = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		addFavourite(data?.img)
		setIsFav(true)
	}
	const removeToFav = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		removeFavourite(data?.img)
		setIsFav(false)
	}

	if (data?.myPin === true) {
		return (
			<div className='px-10 flex justify-center items-center'>
				<div className='shadow-lg rounded-3xl max-w-4xl pr-5 mt-7 flex'>
					<img
						className='pin__img max-h-[700px] max-w-[500px] rounded-l-3xl'
						src={data?.img}
					/>
					<div className='pin__content ml-16 px-5 py-5'>
						<h1 className='mt-5 font-medium text-4xl'>{data?.title}</h1>
						<Link to='/profile'>
							<div className='flex items-center mt-5'>
								<Avatar
									src={myProfile?.avatar}
									sx={{ width: 50, height: 50 }}
								/>
								<p className='ml-2 '>{myProfile?.username}</p>
							</div>
						</Link>

						<div className='mt-10 bg-white'></div>
						<div className='flex items-center'>
							{comments?.length === 0 && (
								<h1 className='text-gray-500 text-2xl font-normal'>
									0 комментариев
								</h1>
							)}
							{comments?.length > 0 && (
								<h1 className='text-gray-500 text-2xl font-normal'>
									{comments?.length} комментария
								</h1>
							)}
							<IconButton className='translate-y-1'>
								{open && (
									<MdExpandMore
										onClick={handleClick}
										className='text-gray-500 w-8 h-8'
									/>
								)}
								{!open && (
									<MdExpandMore
										onClick={handleClick}
										className='text-gray-500 -rotate-90 w-8 h-8'
									/>
								)}
							</IconButton>
						</div>
						{open && (
							<ul className='ml-5'>
								{comments?.map((comment: any) => (
									<li className='mt-2'>
										<div className='flex items-center'>
											<Avatar sx={{ width: 30, height: 30 }} />
											<p className='font-medium ml-2'>{comment.username}</p>
											<p className='ml-2'>{comment.title}</p>
										</div>
									</li>
								))}
							</ul>
						)}
						<div className='mt-10 mb-5 flex'>
							<Avatar src={myProfile?.avatar} sx={{ width: 50, height: 50 }} />
							<form onSubmit={e => handleCreate(e)}>
								<input
									value={comment}
									onChange={e => handleChange(e)}
									className='border-solid border-2 border-gray-400 text-gray-400 px-6 py-3  ml-3 rounded-3xl '
									type='text'
									placeholder='Добавить комментарий'
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div className='px-10 flex justify-center items-center'>
				<div className='shadow-lg rounded-3xl max-w-4xl pr-5 mt-7 flex'>
					<img
						className='pin__img max-h-[700px] max-w-[500px] rounded-l-3xl'
						src={data?.img}
					/>
					<div className='pin__content ml-16 px-5 py-5'>
						<h1 className='mt-5 font-medium text-4xl'>{data?.title}</h1>
						<Link onClick={handleUser} to={`/user/${user?.[0].id}`}>
							<div className='flex items-center mt-5'>
								<Avatar src={user?.[0].avatar} sx={{ width: 50, height: 50 }} />
								<p className='ml-2 '>{user?.[0].username}</p>
							</div>
						</Link>

						{!isFav && (
							<button
								onClick={addToFav}
								className='mt-10 bg-red-500 text-white px-4 py-2 rounded-3xl'
							>
								Сохранить
							</button>
						)}
						{isFav && (
							<button
								onClick={removeToFav}
								className='mt-10 bg-gray-400 text-white px-6 py-2 rounded-3xl'
							>
								Удалить
							</button>
						)}
						<div className='mt-10 bg-white'></div>
						<div className='flex items-center'>
							{comments?.length === 0 && (
								<h1 className='text-gray-500 text-2xl font-normal'>
									0 комментариев
								</h1>
							)}
							{comments?.length > 0 && (
								<h1 className='text-gray-500 text-2xl font-normal'>
									{comments?.length} комментария
								</h1>
							)}
							<IconButton className='translate-y-1'>
								{open && (
									<MdExpandMore
										onClick={handleClick}
										className='text-gray-500 w-8 h-8'
									/>
								)}
								{!open && (
									<MdExpandMore
										onClick={handleClick}
										className='text-gray-500 -rotate-90 w-8 h-8'
									/>
								)}
							</IconButton>
						</div>
						{open && (
							<ul className='ml-5'>
								{comments?.map((comment: any) => (
									<li className='mt-2'>
										<div className='flex items-center'>
											<Avatar sx={{ width: 30, height: 30 }} />
											<p className='font-medium ml-2'>{comment.username}</p>
											<p className='ml-2'>{comment.title}</p>
										</div>
									</li>
								))}
							</ul>
						)}
						<div className='mt-10 mb-5 flex'>
							<Avatar src={myProfile?.avatar} sx={{ width: 50, height: 50 }} />
							<form onSubmit={e => handleCreate(e)}>
								<input
									value={comment}
									onChange={e => handleChange(e)}
									className='border-solid border-2 border-gray-400 text-gray-400 px-6 py-3  ml-3 rounded-3xl '
									type='text'
									placeholder='Добавить комментарий'
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default PinPage
