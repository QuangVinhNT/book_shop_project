import {IoDocumentTextSharp} from 'react-icons/io5'

import CheckoutSuccess from '../CheckoutStatus/CheckoutSuccess'
import CheckoutError from '../CheckoutStatus/CheckoutError'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
export default function Bill() {
	const [checkoutStatus, setCheckoutStatus] = useState(true)
	const [checkoutNoti, setCheckoutNoti] = useState(false)
	const navigate = useNavigate()

	const handleCheckout = async () => {
		setCheckoutNoti(true)
		await new Promise((resolve) => setTimeout(resolve, 2000))
		setCheckoutNoti(false)
		navigate('/books')
	}
	return (
		<>
			<div className='w-1/3 flex flex-col'>
				<div className='relative p-5 rounded-xl'>
					<div className='absolute top-0 left-0 w-full h-full bg-light -z-10 opacity-50 rounded-xl'></div>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full h-2 w-16 bg-star -z-20 before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-full before:bg-star before:translate-y-full before:blur'></div>
					<span className='text-lessDark font-semibold mb-5 inline-block'>
						Checkout
					</span>
					<div className='bg-light text-xs flex flex-col gap-2 p-5 rounded-lg'>
						<div className='flex justify-between text-primary'>
							<span>Subtotal</span>
							<span className='font-semibold'>$ 56.7</span>
						</div>
						<div className='flex justify-between text-primary'>
							<span>Tax</span>
							<span className='font-semibold'>$ 4.33</span>
						</div>
						<div className='flex justify-between text-primary'>
							<span>Discount</span>
							<span className='font-semibold'>$ 1.00</span>
						</div>
					</div>
					<div>
						<div className='mt-10 relative before:content-[""] before:absolute before:top-0 before:-left-10 before:size-10 before:bg-white before:-translate-y-1/2 before:rounded-full after:content-[""] after:absolute after:top-0 after:-right-10 after:size-10 after:bg-white after:-translate-y-1/2 after:rounded-full'>
							<hr className='border-primary border-dashed' />
						</div>
						<div className='flex justify-between items-center py-5 mt-5'>
							<div className='flex flex-col'>
								<span className='text-xs text-cap'>Total</span>
								<span className='text-xl text-primary font-semibold'>$ 60</span>
							</div>
							<IoDocumentTextSharp className='text-5xl text-primary' />
						</div>
					</div>
				</div>
				<button
					className='w-full text-white bg-lessDark p-2 rounded-lg transition-all hover:brightness-125 cursor-pointer mt-10'
					onClick={handleCheckout}
				>
					Payment
				</button>
			</div>
			{checkoutNoti && (
				<div className='absolute top-[50vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] shadow-roundShadow shadow-gray-300 bg-white z-30 rounded-xl pb-5'>
					{checkoutStatus ? <CheckoutSuccess /> : <CheckoutError />}
				</div>
			)}
		</>
	)
}
