import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Books from './pages/Books/Books'
import BookDetail from './pages/BookDetail/BookDetail'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'

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
			},
			{
				path: '/books/howlsmoovingcastle',
				element: <BookDetail />
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/checkout',
				element: <Checkout />
			}
		]
	}
])

createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
)
