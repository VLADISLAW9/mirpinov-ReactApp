import React, { useContext } from 'react'
import Loading from '../components/Loading'
import PinItem from '../components/PinItem'
import { AuthContext } from '../context/context'
import { useDebounce } from '../hooks/debounce'
import { pinsApi, useSearchPinsQuery } from '../store/data/pinsApi'
import {FaRegSadTear} from 'react-icons/fa'

const Home = () => {
	const { isLoading, isError, data: pins } = pinsApi.useFetchAllPinsQuery('')
	const { search } = useContext(AuthContext)
	const debounced = useDebounce(search)
	const { data: searchPin } = useSearchPinsQuery(debounced)
	return (
		<div>
			{isLoading && <Loading />}
			{isError && (
				<div className='mt-20 flex flex-col justify-center items-center'>
					<FaRegSadTear className='text-gray-400 w-20 h-20'/>
					<h1 className='text-gray-400 text-center font-bold text-xl mt-4'>
						Произошла ошибка<br/> при загрузке пинов
					</h1>
				</div>
			)}

			{debounced.length > 0 ? (
				<ul className='pins'>
					{searchPin?.map(pin => (
						<PinItem key={pin.id} pin={pin} />
					))}
				</ul>
			) : (
				<ul className='pins'>
					{pins?.map(pin => (
						<PinItem key={pin.id} pin={pin} />
					))}
				</ul>
			)}
		</div>
	)
}

export default Home
