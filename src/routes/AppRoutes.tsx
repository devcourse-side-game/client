import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import InfoMangement from '../components/user/InfoMangement';
import GameMangement from '../components/user/GameMangement';
import ThemeMangement from '../components/user/ThemeMangement';
import { RootState } from '../stores';
import { useSelector } from 'react-redux';

function AppRoutes() {
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	return (
		<Routes>
			<Route path='/my-parties' element={<Home />} />
			<Route path='/party-finder' element={<Home />} />
			<Route
				path='/'
				element={<Navigate to={isLoggedIn ? '/my-parties' : '/party-finder'} replace />}
			/>
			<Route path='/login' element={isLoggedIn ? <Navigate to='/' replace /> : <Login />} />
			<Route path='/signup' element={isLoggedIn ? <Navigate to='/' replace /> : <Signup />} />
			<Route path='/mypage' element={<MyPage />}>
				<Route index element={<InfoMangement />} />
				<Route path='game' element={<GameMangement />} />
				<Route path='theme' element={<ThemeMangement />} />
			</Route>
		</Routes>
	);
}

export default AppRoutes;
