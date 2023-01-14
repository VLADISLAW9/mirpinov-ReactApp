import { Avatar } from '@mui/material'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useActions } from '../hooks/actions'
import { IUsers } from '../models/IUsers'

interface UserItemProps {
	sub: IUsers
}

const UserItem: FC<UserItemProps> = ({ sub }) => {
	const { getUserId } = useActions()
	const handleGetId = () => {
		getUserId(sub.id)
	}
	return (
		<Link onClick={handleGetId} to={`/user/${sub.id}`}>
			<li className='flex flex-col items-center justify-center mr-10 ml-10'>
				<Avatar src={sub.avatar} sx={{ width: 100, height: 100 }} />
				<p className='mt-2 font-normal text-xl'>{sub.username}</p>
			</li>
		</Link>
	)
}

export default UserItem
