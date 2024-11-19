import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Books from './pages/Books/Books'

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: '/books',
				element: <Books />
			}
		]
	}
])

createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
)
