import {FaRegTimesCircle} from 'react-icons/fa'
import {Link} from 'react-router-dom'

export default function CheckoutError() {
	return (
		<div className='flex flex-col items-center gap-3'>
			<div className='flex items-center justify-center'>
				<img
					src='./images/luxana_book_store_logo.png'
					alt='Logo'
					className='w-[90px] p-[10px]'
				/>
				<span className='brand-font text-[32px] font-bold'>Book Luxana</span>
			</div>
			<span className='text-xl font-bold text-cap'>Error</span>
			<FaRegTimesCircle className='text-5xl text-primary' />
			<Link
				to={'/'}
				className='bg-primary text-white px-3 py-1.5 rounded-lg mt-5 transition-all hover:brightness-125'
			>
				Back to Homepage
			</Link>
		</div>
	)
}
