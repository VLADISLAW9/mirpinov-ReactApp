import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import { Link, Route, Router } from 'react-router-dom'
import { IProfile } from '../models/IProfile'
import { pinsApi } from '../store/data/pinsApi'

const ProfileEdit = () => {
	const { data: profile } = pinsApi.useFetchProfileDataQuery('')
	const [editProfile, {}] = pinsApi.useEditProfileDataMutation()
	const [username, setUsername] = useState()
	const [avatar, setAvatar] = useState()

	const handleChangeUsername = (e: any) => {
		setUsername(e.target.value)
	}

	const handleChangeAvatar = (e: any) => {
		setAvatar(e.target.value)
	}

	const handleEditProfile = async () => {
		await editProfile({
			username: username,
			avatar: avatar,
		} as IProfile)
	}

	return (
		<div className='mt-16 mb-16 flex flex-col justify-center items-center'>
			<div className='flex flex-col items-center'>
				<Avatar src={avatar} sx={{ width: 100, height: 100 }} />
				<form className='flex flex-col'>
					<input
						onChange={e => handleChangeAvatar(e)}
						className='bg-gray-100 px-5 py-2 rounded-3xl mt-10'
						placeholder='Вставьте URL аватарки'
					/>
					<input
						type='text'
						onChange={e => handleChangeUsername(e)}
						className='bg-gray-100 rounded-3xl px-5 py-2 mt-5'
						placeholder='Введите имя '
					/>
						<input
							onClick={handleEditProfile}
							className='mt-10 bg-gray-200 px-4 py-2 rounded-3xl transition-colors cursor-pointer hover:bg-gray-300'
							type='submit'
						/>
				</form>
			</div>
		</div>
	)
}

export default ProfileEdit
