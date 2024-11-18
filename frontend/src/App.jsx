import {Outlet} from 'react-router-dom'
import './App.css'
import Header from './components/client/Header/Header'
import Footer from './components/client/Footer/Footer'

function App() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default App
