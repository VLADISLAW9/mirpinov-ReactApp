import { Input } from 'antd'
import React, { useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { pinsApi } from '../store/data/pinsApi'
import { IPins } from '../models/IPins'
import { Link } from 'react-router-dom'
import { Button, Modal } from 'antd'
import { CardMedia, Paper } from '@mui/material'

const App: React.FC = () => {
	const [createPin, {}] = pinsApi.useCreatePinMutation()
	const [titleInput, setTitleInput] = useState('')
	const [urlInput, setUrlInput] = useState('')
	const { data: myProfile } = pinsApi.useFetchProfileDataQuery('')

	const onChangeInput = (e: any) => {
		setTitleInput(e.target.value)
	}

	const handleChangeUrl = (e: any) => {
		setUrlInput(e.target.value)
	}

	const handleCreate = async () => {
		await createPin({
			myPin: true,
			title: titleInput,
			author: myProfile?.username,
			img: urlInput,
		} as IPins)

		setUrlInput('')
		setTitleInput('')
	}

	return (
		<div className='flex justify-center items-center'>
			<div className='mt-5 bg-gray-100 px-5 py-5 rounded-2xl flex-col text-center'>
				{urlInput.length > 0 ? (
					<CardMedia
						className='rounded-3xl mt-10'
						sx={{ height: 300 }}
						component='img'
						image={urlInput}
					/>
				) : (
					<div className='flex justify-center items-center h-[300px] mt-10 rounded-3xl bg-gray-200'>
						<BiImageAdd className=' text-gray-400 w-16 h-16' />
					</div>
				)}
				<Input
					type='url'
					className='mb-6 mt-16'
					size='large'
					placeholder='Вставьте URL картинки'
					onChange={handleChangeUrl}
				/>
				<Input
					size='large'
					placeholder='Добавьте название пина'
					showCount
					maxLength={20}
					onChange={e => onChangeInput(e)}
				/>
				<Link to='/'>
					<button
						onClick={handleCreate}
						className='mt-6 bg-red-600 text-white px-4 py-2 rounded-2xl'
					>
						Создать пин
					</button>
				</Link>
			</div>
		</div>
	)
}

export default App
