import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import theme from './theme';
import Header from './layouts/Header';
// import Footer from './layouts/Footer';
import { Provider } from 'react-redux';
import { store } from './stores/index';
import { AuthModalProvider } from './contexts/AuthModalContext';
import CommonModal from './components/common/commonMadal';
function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AuthModalProvider>
					<BrowserRouter>
						<Header />
						<Box sx={{ flexGrow: 1 }}>
							<AppRoutes />
						</Box>
						<CommonModal />
					</BrowserRouter>
				</AuthModalProvider>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
