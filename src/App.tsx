import React from 'react';
import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SwapPage } from './SwapPage';
import { FaqPage } from './FaqPage';

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
		  	</Routes>
			</Container>
	  	</Router>
  	);
}

export default App;
