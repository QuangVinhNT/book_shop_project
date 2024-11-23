import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

import './index.css'
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home/Home.jsx'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import EmailVerification from './pages/Auth/EmailVerification'
import AuthRoute from './pages/ProtectedRoutes/AuthRoute'
import EmailVerificationRoute from './pages/ProtectedRoutes/EmailVerificationRoute'
import Client from './pages/Client'

import { useAuthStore } from './stores/authStore'
import { environment } from './utils/environment'
import Books from './pages/Books/Books'
import BookDetail from './pages/BookDetail/BookDetail'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Account from './pages/Account/Account'
import Admin from './Admin'
import ProductList from './pages/Admin/ProductList/ProductList'

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
			},
			{
				path: '/account',
				element: <Account />
			}
		]
	},
	{
		path: '/admin',
		element: <Admin />,
		children: [
			{
				path: '/admin/products',
				element: <ProductList />
			}
		]
	},
	{
		path: '/login',
		element: <GoogleOAuthProvider clientId="496139560764-n7u29ks4p1untriic3l6j9f1sfc23jne.apps.googleusercontent.com">
			<AuthRoute>
				<Login />
			</AuthRoute>
		</GoogleOAuthProvider>
	},
	{
		path: '/register',
		element: <GoogleOAuthProvider clientId="496139560764-n7u29ks4p1untriic3l6j9f1sfc23jne.apps.googleusercontent.com">
			<AuthRoute>
				<Register />
			</AuthRoute>
		</GoogleOAuthProvider>
	},
	{
		path: '/email-verify',
		element: <EmailVerificationRoute>
			<EmailVerification />
		</EmailVerificationRoute>
	}
])

function App() {
	const [loading, setLoading] = useState(true)
	const setAccount = useAuthStore(state => state.setAccount)

	const getAccount = async () => {
		setLoading(true)
		try {
			const response = await fetch(`${environment.BACKEND_URL}/auth/account`, {
				method: 'GET',
				credentials: 'include'
			})

			if (response.ok) {
				const data = await response.json()
				setAccount(data.account)
			}
			else {
				setAccount(null)
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getAccount()
	}, [])

	if (loading) {
		return <div className='flex items-center text-3xl text-red-500 justify-center'>
			Loading
		</div>
	}

	return (
		<div>
			<RouterProvider router={router} />
			<ToastContainer position='top-center'/>
		</div>
	)
}

export default App
