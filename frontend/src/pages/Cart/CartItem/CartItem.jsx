import { FaMinus, FaPlus } from 'react-icons/fa'
import { IoTrashBinOutline } from 'react-icons/io5'
import { useCartStore } from '~/stores/cartStore'

export default function CartItem({ item }) {
	const removeItem = useCartStore(state => state.removeItem)
	const addToCart = useCartStore(state => state.addToCart)
	const decreaseQuantity = useCartStore(state => state.decreaseQuantity)

	return (
		<div className='relative px-5 py-5 bg-white shadow-roundShadow shadow-light rounded-xl'>
			<img
				src={item.product.image[0].image_name}
				alt=''
				className='w-[100px] h-[140px] object-cover rounded-xl absolute left-0 bottom-0'
			/>
			<div className='flex items-center'>
				<div className='w-2/5 flex gap-2 flex-col justify-center pl-[120px]'>
					<span className='font-semibold'>{item.product.name}</span>
					<span className='text-xs font-medium'>{item.product.author}</span>
				</div>
				<div className='w-1/5'>
					<div className='border-2 border-gray-200 rounded-md flex items-center w-fit mx-auto bg-gray-200'>
						<button
							className='px-4 transition-all hover:text-primary py-4'
							onClick={() => addToCart(item.product.id)}
						>
							<FaPlus className='text-sm' />
						</button>
						<span className='px-4 text-xl inline-block w-16 text-center overflow-hidden'>
							{item.quantity}
						</span>
						<button
							className='px-4 transition-all hover:text-primary py-4'
							onClick={() => decreaseQuantity(item.product.id)}
						>
							<FaMinus className='text-sm' />
						</button>
					</div>
				</div>
				<div className='w-[calc(20%-40px)]'>
					<span className='inline-block w-full text-center'>
						{item.product.price.toFixed(2)}
					</span>
				</div>
				<div className='w-1/5 flex justify-center'>
					<span>{(item.product.price * item.quantity).toFixed(2)}</span>
				</div>
				<button onClick={() => removeItem(item.product_id)} className='bg-white border border-light rounded-full size-10 flex justify-center items-center text-primary shadow-md transition-all hover:bg-red-400 hover:text-white hover:border-white'>
					<IoTrashBinOutline />
				</button>
			</div>
		</div>
	)
}
