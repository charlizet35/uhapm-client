import React, { lazy, Suspense, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import FourOFour from './components/404/FourOFour';
import Loading from './components/Loading/Loading';
import { initialize } from './utils/reactGA';
import axios from 'axios';   //axios for http requests

const NavBar = lazy(() => import('./components/Navbar/Navbar'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const ScrollTop = lazy(() => import('./components/ScrollTop/ScrollTop'));
const About = lazy(() => import('./pages/About/About'));
const Membership = lazy(() => import('./pages/Membership/Membership'));
const Events = lazy(() => import('./pages/Events/Events'));
const Home = lazy(() => import('./pages/Home/Home'));
const Register = lazy(() => import('./pages/Register/Register'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const queryClient = new QueryClient();

const App = () => {
	initialize();
	const [events, setEvents] = useState([]);

	//fetch events from server on component mount
	useEffect(() => {
			fetchEvents();	
	}, []);

	const fetchEvents = async () => {
		try {
			const response = await axios.get('/events');
			setEvents(response.data);
			} catch (error) {
			console.error('Error fetching events:', error);
		}
	};

	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Suspense fallback={<Loading />}>
					<ScrollTop />
					<NavBar />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/about' element={<About />} />
						<Route path='/register' element={<Register />} />
						<Route path='/events' element={<Events />} />
						<Route path='/membership' element={<Membership />} />
						<Route path='/404' element={<NotFound />} />
						<Route path='*' element={<FourOFour />} />
					</Routes>
					<Footer />
				</Suspense>
			</Router>
		</QueryClientProvider>
	);
};


export default App;
