import Summary from '~/components/client/Summary/Summary'
import CartItem from './CartItem/CartItem'
import {Link} from 'react-router-dom'
import {FaPlus} from 'react-icons/fa'
import book1 from '~/assets/images/book_1.png'
import {useAuthStore} from '~/stores/authStore'
import {useCartStore} from '~/stores/cartStore'
import {useEffect} from 'react'
import cartEmpty from '~/assets/images/empty_cart.png'
import {FaArrowLeftLong} from 'react-icons/fa6'

const items = [
	{
		name: 'Joker',
		author: 'Christine Nostlinger',
		image: book1,
		quantity: 1,
		price: 16.7
	},
	{
		name: 'Joker',
		author: 'Christine Nostlinger',
		image: book1,
		quantity: 1,
		price: 16.7
	}
]

export default function Cart() {
	const account = useAuthStore((state) => state.account)
	const getCartItems = useCartStore((state) => state.getCartItems)
	const cartItems = useCartStore((state) => state.cartItems)

	useEffect(() => {
		getCartItems()
	}, [])

	if (!account) {
		return (
			<div className='text-3xl text-center py-5 text-red-500'>
				Login to use cart
			</div>
		)
	}

	return (
		<div className='pt-10'>
			<Link to='/books' className='flex items-center ml-10 text-2xl py-2'>
				<div className='flex items-center gap-3 mb-2 hover:text-primary w-fit cursor-pointer transition-all'>
					<FaArrowLeftLong />
					<span className='text-lg font-medium'>Back</span>
				</div>
			</Link>
			<div className='w-3/4 mx-auto mb-10'>
				<div className='bg-lessDark text-white text-sm font-medium p-5 rounded-xl'>
					<span className='inline-block w-2/5 text-center'>Item</span>
					<span className='inline-block w-1/5 text-center'>Quantity</span>
					<span className='inline-block w-[calc(20%-40px)] text-center'>
						Price
					</span>
					<span className='inline-block w-1/5 text-center'>Total Price</span>
					<span className='inline-block w-[40px] text-center'></span>
				</div>
				{cartItems.length == 0 ? (
					<div className='flex justify-center py-3'>
						<img src={cartEmpty} />
					</div>
				) : (
					<div className='flex flex-col gap-20 py-20 '>
						{cartItems.map((item, index) => {
							return (
								<div key={index}>
									<CartItem item={item} />
								</div>
							)
						})}
					</div>
				)}
				{cartItems.length > 0 && (
					<div className='bg-[#f5ecf7] flex px-16 py-10 gap-36 rounded-xl'>
						<div className='w-1/2 flex flex-col gap-5'>
							<h2 className='text-3xl font-semibold'>Shopping Summary</h2>
							<p className='text-cap'>
								Review your selected items, check discounts and confirm your
								order details. Make sure everything is perfect before you
								checkout!
							</p>
							<div className='flex items-center gap-1'>
								<input
									type='text'
									placeholder='Discount Code'
									className='bg-[#e6cfed] px-4 py-2 text-sm focus:outline-none rounded-md'
								/>
								<button className='bg-lessDark text-white size-9 flex items-center justify-center rounded-md transition-all hover:brightness-125'>
									<FaPlus className='text-xs' />
								</button>
							</div>
						</div>
						<div className='w-1/2'>
							<div className='flex flex-col gap-2.5'>
								<div className='flex justify-between items-center'>
									<span className='text-cap font-bold'>Subtotal</span>
									<span className='text-lg font-semibold'>
										${' '}
										{cartItems
											.reduce(
												(total, item) =>
													total + item.quantity * item.product.price,
												0
											)
											.toFixed(2)}
									</span>
								</div>
								<div className='flex justify-between items-center'>
									<span className='text-cap font-bold'>Discount</span>
									<span className='text-lg font-semibold'>$ 0</span>
								</div>
							</div>
							<hr className='mt-5 mb-4 border-primary' />
							<div className='flex justify-between'>
								<span className='text-cap font-bold'>Total</span>
								<span className='text-lg font-semibold'>
									${' '}
									{cartItems
										.reduce(
											(total, item) =>
												total + item.quantity * item.product.price,
											0
										)
										.toFixed(2)}
								</span>
							</div>
							<Link to={'/checkout'}>
								<button className='block w-full bg-lessDark text-white uppercase text-sm py-3 mt-3 rounded-md transition-all hover:brightness-125'>
									Checkout
								</button>
							</Link>
							<Link
								className='block text-center text-sm text-lessDark mt-2 hover:underline'
								to={'/books'}
							>
								Continue Shopping
							</Link>
						</div>
					</div>
				)}
			</div>
			<Summary />
		</div>
	)
}
