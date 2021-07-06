import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import reportWebVitals from './reportWebVitals';

/* import $ from 'jquery';
import Popper from 'popper.js'; */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

import Navbar from './components/Navbar/NavbarModern';
import Dashboard from './pages/Dashboard/Dashboard';
import ScanUrl from './pages/ScanUrl/ScanUrl';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Navbar />
			<div className=''>
				<Switch>
					<Route exact path='/' component={Dashboard} />
					<Route path='/scanurl' component={ScanUrl} />
				</Switch>
				<ToastContainer />
			</div>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
