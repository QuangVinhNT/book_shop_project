import {Outlet, useLocation} from 'react-router-dom'
import './App.css'
import Header from './components/client/Header/Header'
import Footer from './components/client/Footer/Footer'
import Breadcrumbs from './components/client/Breadcrumbs/Breadcrumbs'

function App() {
	const location = useLocation().pathname
	return (
		<>
			<Header />
			{location !== '/' && <Breadcrumbs />}
			<Outlet />
			<Footer />
		</>
	)
}

export default App
