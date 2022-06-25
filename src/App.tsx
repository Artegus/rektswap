import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SwapPage } from './pages/SwapPage';
import { MainPage } from './pages/MainPage';

import { Container } from '@chakra-ui/layout';

const App: FC = () => {
	
	const hostSplitted = window.location.host.split('.');
	const subdom = hostSplitted[hostSplitted.length - 1];

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
