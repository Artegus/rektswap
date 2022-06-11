import React from 'react';
import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SwapPage } from './pages/SwapPage';
import { FaqPage } from './pages/FaqPage';
import { MainPage } from './pages/MainPage';

import { Container } from '@chakra-ui/layout';

const App: FC = () => {

	return (
	  	<Router>
    		<Container maxW="100vw" p={0} m={0} >
			<Routes>
			  	<Route
				  	path='/'
				  	element={<SwapPage />}
			  	/>
				<Route 
					path='/faq'
					element={<FaqPage />}
				/>
				<Route 
					path='/main'
					element={<MainPage />}
				/>
		  	</Routes>
			</Container>
	  	</Router>
  	);
}

export default App;
