import React, { useState } from 'react'
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile';
import Home from './pages/Home';
import PinsCreator from './pages/PinsCreator';
import { AuthContext } from './context/context'
import PinPage from './pages/PInPage';
import { pinsApi } from './store/data/pinsApi';
import UserPage from './pages/UserPage';
import ProfileEdit from './pages/ProfileEdit';
import SubscriptionsPage from './pages/SubscriptionsPage';

function App() {
	const [search, setSearch] = useState('')
  return (
		<div className='App'>
			<AuthContext.Provider value={{ search, setSearch }}>
				<Navbar />
				<div className='px-10 mainContainer'>
					<Routes>
						<Route path='/pins-creator' element={<PinsCreator />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/' element={<Home />} />
						<Route path='/pin/:id' element={<PinPage />} />
						<Route path='/user/:id' element={<UserPage />} />
						<Route path='/profile-edit' element={<ProfileEdit />} />
						<Route path='/subscriptions' element={<SubscriptionsPage />} />
					</Routes>
				</div>
			</AuthContext.Provider>
		</div>
	)
}

export default App;
