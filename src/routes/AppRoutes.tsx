import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import MyPage from '../pages/MyPage';
import InfoMangement from '../components/user/InfoMangement';
import GameMangement from '../components/user/GameMangement';
import ThemeMangement from '../components/user/ThemeMangement';

function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<Signup />} />
			<Route path='/mypage' element={<MyPage />}>
				<Route index element={<InfoMangement />} />
				<Route path='game' element={<GameMangement />} />
				<Route path='theme' element={<ThemeMangement />} />
			</Route>
		</Routes>
	);
}

export default AppRoutes;
