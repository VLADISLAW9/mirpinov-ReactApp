import React, { useContext } from 'react'
import {TbWorldLatitude} from 'react-icons/tb'
import { Link} from 'react-router-dom'
import {AiOutlinePlusCircle} from 'react-icons/ai'
import { Avatar } from '@mui/material'
import { pinsApi } from '../store/data/pinsApi'
import { AuthContext } from '../context/context'
 
const Navbar = () => {
	const { search, setSearch } = useContext(AuthContext)
	const { data: profile } = pinsApi.useFetchProfileDataQuery('')
	return (
		<div className='shadow-md flex justify-between  w-full px-6 py-2 items-center '>
			<Link className='logo' to='/'>
				<TbWorldLatitude className='w-8 h-8 text-red-600' />
			</Link>
			<input
				className='bg-gray-100 px-4 py-2 rounded-2xl w-3/4 search'
				type='text'
				placeholder='Поиск...'
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
			<div className='flex items-center'>
				<Link className='mr-4' to='/pins-creator'>
					<AiOutlinePlusCircle className='w-8 h-8 text-red-600' />
				</Link>
				<Link className='' to='/profile'>
					<Avatar
						src={profile?.avatar}
						sx={{ width: 30, height: 30 }}
					/>
				</Link>
			</div>
		</div>
	)
}

export default Navbar