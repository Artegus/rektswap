import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SwapPage } from './pages/SwapPage';
import { MainPage } from './pages/MainPage';

import { Container } from '@chakra-ui/layout';

const App: FC = () => {

	return (
		<Router>
			<Container
				maxW="100vw"
				p={0}
				m={0}
			>
				<Routes>
					<Route
						path='/'
						element={<MainPage />}
					/>
					<Route
						path='/swap'
						element={<SwapPage />}
					/>
					<Route path='/*' element={<Navigate to='/' replace />} />
					<Route path='/swap/*' element={<Navigate to='/swap' replace />} />
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
