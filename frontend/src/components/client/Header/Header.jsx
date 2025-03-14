import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoCartOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuthStore } from '~/stores/authStore'
import { useCartStore } from '~/stores/cartStore'
import { environment } from '~/utils/environment'
import logo from '~/assets/luxana_book_store_logo.png'
export default function Header() {
	const navigate = useNavigate()
	const [showDropdown, setShowDropdown] = useState(false)

	const setAccount = useAuthStore((state) => state.setAccount)
	const account = useAuthStore((state) => state.account)

	const quantity = useCartStore((state) => state.quantity)

	const logout = async () => {
		const toastId = toast.loading('Please wait...')
		try {
			const response = await fetch(`${environment.BACKEND_URL}/auth/logout`, {
				method: 'GET',
				credentials: 'include'
			})

			if (response.ok) {
				setAccount(null)
				toast.update(toastId, {
					render: 'Logout success',
					type: 'success',
					isLoading: false,
					autoClose: 3000
				})
				navigate('/')

			} else {
				const data = await response.json()
				toast.update(toastId, {
					render: data.message,
					type: 'error',
					isLoading: false,
					autoClose: 3000
				})
			}
		} catch (error) {
			toast.update(toastId, {
				render: 'Internal server error',
				type: 'error',
				isLoading: false,
				autoClose: 3000
			})
		}
	}

	return (
		<div className='flex items-center justify-between h-[110px] px-[25px]'>
			{/* logo */}
			<Link className='flex items-center cursor-pointer' to={'/'}>
				<img
					src={logo}
					alt='Logo'
					className='w-[90px] p-[10px]'
				/>
				<span className='brand-font text-[32px] font-bold'>Book Luxana</span>
			</Link>

			{/* search bar */}
			<div className='w-1/2 h-10 px-3 rounded-md flex items-center justify-between bg-lightGray'>
				<input
					type='text'
					placeholder='Find books here...'
					className='bg-transparent focus:outline-none text-dark w-full text-sm'
				/>
				<CiSearch className='text-2xl cursor-pointer text-black transition-all hover:text-primary' />
			</div>

			{account && (
				<Link to={'/cart'}>
					<div className='group size-10 rounded-full relative flex justify-center items-center shadow-sm cursor-pointer transition-all hover:bg-primary'>
						<IoCartOutline className='text-2xl transition-all group-hover:text-white' />
						<span className='absolute -top-1 -right-1 size-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[12px]'>
							{quantity}
						</span>
					</div>
				</Link>
			)}

			{account ? (
				<div className='group relative'>
					<button
						className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
						type='button'
					>
						{account.full_name}
						{account.image && (
							<div>
								<img
									width={25}
									height={25}
									className='rounded-full ml-2'
									src={account.image}
								/>
							</div>
						)}
					</button>

					<div
						className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute top-full right-0 group-hover:block hidden`}
					>
						<ul
							className='py-2 text-sm text-gray-700 dark:text-gray-200'
							aria-labelledby='dropdownDividerButton'
						>
							{account.role === 'ADMIN' && <li>
								<Link
									to='/admin'
									className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
								>
									Admin
								</Link>
							</li>}
							<li>
								<Link
									to='/account'
									className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
								>
									Profile
								</Link>
							</li>
							<li>
								<a
									href='#'
									className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
								>
									Purchase history
								</a>
							</li>
							<li>
								<a
									href='#'
									className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
								>
									Earnings
								</a>
							</li>
						</ul>
						<div onClick={logout} className='py-2'>
							<a
								href='#'
								className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
							>
								Logout
							</a>
						</div>
					</div>
				</div>
			) : (
				<div className='text-sm font-medium'>
					<Link
						to='/login'
						className='px-[20px] py-3 transition-all hover:text-primary hover:underline'
					>
						Sign in
					</Link>
					<Link
						to='/register'
						className='px-[10px] py-3 rounded-md bg-primary text-white transition-all hover:brightness-125'
					>
						Create account
					</Link>
				</div>
			)}
		</div>
	)
}
