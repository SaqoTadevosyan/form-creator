import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import ConfigurePage from '../pages/ConfigurePage';
import ProfilePage from '../pages/ProfilePage/index';
import MainWrapper from '../components/Wrappers/MainWrapper';
const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainWrapper />}>
					<Route path='/configure' element={<ConfigurePage />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/' element={<Navigate replace to='/configure' />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
