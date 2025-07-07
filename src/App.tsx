import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Header from './layouts/Header';
import { Provider } from 'react-redux';
import { store } from './stores/index';
import { AuthModalProvider } from './contexts/AuthModalContext';
import CommonModal from './components/common/commonMadal';
import { CustomThemeProvider } from './contexts/ThemeContext';

function App() {
	return (
		<Provider store={store}>
			<CustomThemeProvider>
				<AuthModalProvider>
					<BrowserRouter>
						<Header />
						<Box sx={{ flexGrow: 1 }}>
							<AppRoutes />
						</Box>
						<CommonModal />
					</BrowserRouter>
				</AuthModalProvider>
			</CustomThemeProvider>
		</Provider>
	);
}

export default App;
