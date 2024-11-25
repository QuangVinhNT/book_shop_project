import {FaStar} from 'react-icons/fa'
import {BsDot} from 'react-icons/bs'
import {CiShare2} from 'react-icons/ci'
import {IoCartOutline} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import { useCartStore } from '~/stores/cartStore'

export default function BookCard({book}) {

	const addToCart = useCartStore(state => state.addToCart)

	return (
		<div className='w-fit relative mb-10'>
			<div className='group/image relative cursor-pointer overflow-hidden'>
				<Link to={book.link}>
					<div className='absolute w-full h-full bg-primary group-hover/image:opacity-50 opacity-0 rounded-2xl z-10 transition-all'></div>
				</Link>
				<div className='absolute -bottom-24 group-hover/image:bottom-8 right-4 flex flex-col gap-3 text-lg text-primary transition-all z-30'>
					<div className='bg-white size-10 rounded-full flex justify-center items-center hover:bg-primary hover:text-white transition-all'>
						<CiShare2 />
					</div>
					<div onClick={() => addToCart(book.id)} className='bg-white size-10 rounded-full flex justify-center items-center hover:bg-primary hover:text-white transition-all'>
						<IoCartOutline />
					</div>
				</div>
				<div className='rounded-2xl overflow-hidden'>
					<img
						src={book.image[0].image_name}
						alt=''
						className='lg:w-[200px] lg:h-[300px] 2xl:w-[250px] 2xl:h-[350px] object-cover'
					/>
				</div>
				{book.reduced_price !== 0 && (
					<div className='absolute top-5 left-0 px-4 py-1 rounded-r-full bg-star z-20'>
						<span className='text-white text-sm'>-{book.reduced_price * 100}%</span>
					</div>
				)}
			</div>
			<div className='mt-4 flex flex-col gap-1'>
				<div className='flex items-center gap-1'>
					<FaStar className='text-star text-xs' />
					<span className='text-sm'>3.5</span>
					<div className='flex items-center ml-2 text-cap'>
						<BsDot className='text-lg' />
						<span className='text-xs'>100 Reviews</span>
					</div>
				</div>
				<span className='text-primary text-sm font-medium'>{book.category.name}</span>
				<Link to={book.link}>
					<h6 className='lg:text-xl 2xl:text-2xl font-bold hover:text-primary cursor-pointer transition-all'>
						{book.name}
					</h6>
				</Link>
				<span className='text-xs lg:font-medium 2xl:font-semibold text-cap'>
					{book.author}
				</span>
				<span className='lg:text-lg 2xl:text-xl font-bold'>
					$ {book.price.toFixed(2)}
				</span>
			</div>
		</div>
	)
}
