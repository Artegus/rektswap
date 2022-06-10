import React from 'react';
import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SwapPage } from './SwapPage';
import { FaqPage } from './FaqPage';

const App: FC = () => {

  return (
	  <Router>
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
	  </Router>
  );
}

export default App;
