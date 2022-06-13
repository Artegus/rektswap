import React from 'react';
import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SwapPage } from './pages/SwapPage';
import { FaqPage } from './pages/FaqPage';
import { MainPage } from './pages/MainPage';

import { Container } from '@chakra-ui/layout';

const App: FC = () => {
	
	const subdom = window.location.host.split('.')[0];

	return (
	  	<Router>
    		<Container 
				maxW="100vw" 
				p={0} 
				m={0} 
			>
			{subdom === 'app' ? (
				<Routes>
					<Route
						path='/'
						element={<SwapPage />}
					/> 
				</Routes>
			) : (
				<Routes>
					<Route 
						path='/'
						element={<MainPage />}
					/>
				</Routes>
			)}
			</Container>
	  	</Router>
  	);
}

export default App;
