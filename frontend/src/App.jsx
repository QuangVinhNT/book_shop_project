import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {ToastContainer} from 'react-toastify'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home/Home.jsx'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import EmailVerification from './pages/Auth/EmailVerification'
import AuthRoute from './pages/ProtectedRoutes/AuthRoute'
import EmailVerificationRoute from './pages/ProtectedRoutes/EmailVerificationRoute'
import Client from './pages/Client'

import {useAuthStore} from './stores/authStore'
import {environment} from './utils/environment'
import Books from './pages/Books/Books'
import BookDetail from './pages/BookDetail/BookDetail'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Account from './pages/Account/Account'
import Admin from './Admin'
import ProductList from './pages/Admin/ProductList/ProductList'
import NotFound from './pages/NotFound'
import ProductUpdate from './pages/Admin/ProductList/ProductUpdate/ProductUpdate'
import ViewProduct from './pages/Admin/ProductList/ProductDetail/ViewProduct'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ProductAddition from './pages/Admin/ProductList/ProductAddition/ProductAddtion'
import Loading from './components/notification/Loading/Loading'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import OrdersInvoice from './pages/Admin/OrdersInvoice/OrdersInvoice'
import Categories from './pages/Admin/Categories/Categories'
import Customers from './pages/Admin/Customers/Customers'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Client />,
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
				path: '/admin',
				element: <Dashboard />
			},
			{
				path: '/admin/products',
				element: <ProductList />
			},
			{
				path: '/admin/categories',
				element: <Categories />
			},
			{
				path: '/admin/orders',
				element: <OrdersInvoice />
			},
			{
				path: '/admin/customers',
				element: <Customers />
			},
			{
				path: '/admin/add-product',
				element: <ProductAddition />
			},
			{
				path: 'edit-product/:id',
				element: <ProductUpdate />
			},
			{
				path: 'view-product/:id',
				element: <ViewProduct />
			}
		]
	},
	{
		path: '/login',
		element: (
			<AuthRoute>
				<Login />
			</AuthRoute>
		)
	},
	{
		path: '/register',
		element: (
			<AuthRoute>
				<Register />
			</AuthRoute>
		)
	},
	{
		path: '/email-verify',
		element: (
			<EmailVerificationRoute>
				<EmailVerification />
			</EmailVerificationRoute>
		)
	},
	{
		path: '/forgot-password',
		element: <ForgotPassword />
	},
	{
		path: '*',
		element: <NotFound />
	}
])

function App() {
	const [loading, setLoading] = useState(true)
	const setAccount = useAuthStore((state) => state.setAccount)

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
			} else {
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
		return (
			<div className='h-screen relative'>
				<Loading />
			</div>
		)
	}

	return (
		<div>
			<RouterProvider router={router} />
			<ToastContainer position='top-center' />
		</div>
	)
}

export default App
