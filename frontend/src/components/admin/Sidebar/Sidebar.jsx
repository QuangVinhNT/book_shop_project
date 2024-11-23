import {RxDashboard} from 'react-icons/rx'
import {MdContentPaste} from 'react-icons/md'
import {FaAngleUp} from 'react-icons/fa6'
import {FaAngleDown} from 'react-icons/fa6'
import {LuShoppingCart} from 'react-icons/lu'
import {BsPeople} from 'react-icons/bs'
import {FiHeadphones} from 'react-icons/fi'
import {IoSettingsOutline} from 'react-icons/io5'
import {useState} from 'react'
import {Link} from 'react-router-dom'

export default function Sidebar() {
	const [tabSelected, setTabSelected] = useState(
		localStorage.getItem('sidebarSelected') ?? 'Dashboard'
	)
	const [showProductChild, setShowProductChild] = useState(
		tabSelected === 'Product List' || tabSelected === 'Categories'
			? true
			: false
	)
	return (
		<div className='w-[250px] border-r border-gray-300'>
			<div className='flex items-center gap-3 h-[70px] justify-center'>
				<img
					src='./images/luxana_book_store_logo.png'
					alt='Logo'
					className='size-9 rounded-full p-2 border border-primary'
				/>
				<span className='brand-font text-2xl font-medium'>Book Luxana</span>
			</div>
			<div className='p-3 font-semibold text-cap flex flex-col justify-between gap-2 h-[calc(100vh-60px)]'>
				<div className='flex flex-col gap-2'>
					<Link>
						<div
							className={`flex items-center gap-2 py-3 px-2 rounded-lg transition-all cursor-pointer hover:bg-light hover:text-primary ${
								tabSelected === 'Dashboard' && 'bg-light text-primary'
							}`}
							onClick={() => {
								setTabSelected('Dashboard')
								setShowProductChild(false)
								localStorage.setItem('sidebarSelected', 'Dashboard')
							}}
						>
							<RxDashboard className='text-xl' />
							<span className='text-sm'>Dashboard</span>
						</div>
					</Link>
					<div className='flex flex-col overflow-hidden'>
						<div
							className={`flex items-center justify-between py-3 px-2 rounded-lg transition-all cursor-pointer hover:bg-light hover:text-primary ${
								tabSelected === 'Product List' || tabSelected === 'Categories'
									? 'bg-light text-primary'
									: 'bg-white'
							} z-10 `}
							onClick={() => setShowProductChild(!showProductChild)}
						>
							<div className='flex items-center gap-2 z-20'>
								<MdContentPaste className='text-xl' />
								<span className='text-sm'>Product</span>
							</div>
							{showProductChild ? (
								<FaAngleUp className='text-xl' />
							) : (
								<FaAngleDown className='text-xl' />
							)}
						</div>
						<div
							className={`flex flex-col text-sm transition-all ${
								showProductChild ? 'mt-2' : '-mt-[88px]'
							}`}
						>
							<Link
								to={'/admin/products'}
								className={`py-3 pl-9 rounded-lg transition-all cursor-pointer hover:bg-primary hover:text-white ${
									tabSelected === 'Product List' && 'bg-primary text-white'
								}`}
								onClick={() => {
									localStorage.setItem('sidebarSelected', 'Product List')
									setTabSelected('Product List')
								}}
							>
								Product List
							</Link>
							<Link
								className={`py-3 pl-9 rounded-lg transition-all cursor-pointer hover:bg-primary hover:text-white ${
									tabSelected === 'Categories' && 'bg-primary text-white'
								}`}
								onClick={() => {
									localStorage.setItem('sidebarSelected', 'Categories')
									setTabSelected('Categories')
								}}
							>
								Categories
							</Link>
						</div>
					</div>
					<Link>
						<div
							className={`flex items-center gap-2 py-3 px-2 rounded-lg transition-all cursor-pointer hover:bg-light hover:text-primary ${
								tabSelected === 'Orders' && 'bg-light text-primary'
							}`}
							onClick={() => {
								localStorage.setItem('sidebarSelected', 'Orders')
								setTabSelected('Orders')
								setShowProductChild(false)
							}}
						>
							<LuShoppingCart className='text-xl' />
							<span className='text-sm'>Orders</span>
						</div>
					</Link>
					<Link>
						<div
							className={`flex items-center gap-2 py-3 px-2 rounded-lg transition-all cursor-pointer hover:bg-light hover:text-primary ${
								tabSelected === 'Customers' && 'bg-light text-primary'
							}`}
							onClick={() => {
								localStorage.setItem('sidebarSelected', 'Customers')
								setTabSelected('Customers')
								setShowProductChild(false)
							}}
						>
							<BsPeople className='text-xl' />
							<span className='text-sm'>Customers</span>
						</div>
					</Link>
				</div>
				<div className='flex flex-col gap-2'>
					<Link>
						<div
							className={`flex items-center gap-2 py-3 px-2 rounded-lg transition-all cursor-pointer hover:bg-light hover:text-primary ${
								tabSelected === 'Support' && 'bg-light text-primary'
							}`}
							onClick={() => {
								localStorage.setItem('sidebarSelected', 'Support')
								setTabSelected('Support')
								setShowProductChild(false)
							}}
						>
							<FiHeadphones className='text-xl' />
							<span className='text-sm'>Support</span>
						</div>
					</Link>
					<Link>
						<div
							className={`flex items-center gap-2 py-3 px-2 rounded-lg transition-all cursor-pointer hover:bg-light hover:text-primary ${
								tabSelected === 'Setting' && 'bg-light text-primary'
							}`}
							onClick={() => {
								localStorage.setItem('sidebarSelected', 'Setting')
								setTabSelected('Setting')
								setShowProductChild(false)
							}}
						>
							<IoSettingsOutline className='text-xl' />
							<span className='text-sm'>Setting</span>
						</div>
					</Link>
				</div>
			</div>
		</div>
	)
}