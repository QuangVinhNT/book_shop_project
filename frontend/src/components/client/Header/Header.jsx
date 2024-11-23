import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoCartOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuthStore } from '~/stores/authStore'
import { environment } from '~/utils/environment'
export default function Header() {

	const [showDropdown, setShowDropdown] = useState(false)

	const setAccount = useAuthStore(state => state.setAccount)
	const account = useAuthStore(state => state.account)

	const logout = async () => {
		const toastId = toast.loading('Please wait...')
		try {
			const response = await fetch(`${environment.BACKEND_URL}/auth/logout`, {
				method: 'GET',
				credentials: 'include'
			})

			if (response.ok) {
				setAccount(null)
				toast.update(toastId, { render: 'Logout success', type: 'success', isLoading: false, autoClose: 3000 })
			}
			else {
				const data = await response.json()
				toast.update(toastId, { render: data.message, type: 'error', isLoading: false, autoClose: 3000 })
			}
		} catch (error) {
			toast.update(toastId, { render: 'Internal server error', type: 'error', isLoading: false, autoClose: 3000 })
		}
	}

	return (
		<div className='flex items-center justify-between h-[110px] px-[25px]'>
			{/* logo */}
			<Link className='flex items-center cursor-pointer' to={'/'}>
				<img
					src='./images/luxana_book_store_logo.png'
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

			{/* cart */}
			<div className='group size-10 rounded-full relative flex justify-center items-center shadow-sm cursor-pointer transition-all hover:bg-primary'>
				<IoCartOutline className='text-2xl transition-all group-hover:text-white' />
				<div className='absolute top-2 right-2 bg-[#CF3A3A] size-[9px] rounded-full flex justify-center items-center'>
					<span className='text-white text-[6px]'>1</span>
				</div>
			</div>

			{
				account ? <div>

					<button onClick={() => setShowDropdown(!showDropdown)}
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
						{account.full_name}
						{account.image && <div>
							<img width={25} height={25} className='rounded-full ml-2' src={account.image} /></div>}
					</button>

					<div className={`z-10 ${showDropdown ? 'absolute right-0' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
						<ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
							<li>
								<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
							</li>
							<li>
								<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Purchase history</a>
							</li>
							<li>
								<a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
							</li>
						</ul>
						<div onClick={logout} className="py-2">
							<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</a>
						</div>
					</div>

				</div> : <div className='text-sm font-medium'>
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
			}

		</div>
	)
}
