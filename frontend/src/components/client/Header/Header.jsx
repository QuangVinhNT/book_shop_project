import {CiSearch} from 'react-icons/ci'
import {IoCartOutline} from 'react-icons/io5'
import {Link} from 'react-router-dom'
export default function Header() {
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

			{/* auth */}
			<div className='text-sm font-medium'>
				<Link
					to={'#'}
					className='px-[20px] py-3 transition-all hover:text-primary hover:underline'
				>
					Sign in
				</Link>
				<Link
					to={'#'}
					className='px-[10px] py-3 rounded-md bg-primary text-white transition-all hover:brightness-125'
				>
					Create account
				</Link>
			</div>
		</div>
	)
}
