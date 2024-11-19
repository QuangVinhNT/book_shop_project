import {FaStar} from 'react-icons/fa'
import {BsDot} from 'react-icons/bs'
import {CiShare2} from 'react-icons/ci'
import {IoCartOutline} from 'react-icons/io5'

export default function BookCard({book}) {
	return (
		<div className='w-fit relative mb-10'>
			<div className='group/image relative cursor-pointer overflow-hidden'>
				<div className='absolute w-full h-full bg-primary group-hover/image:opacity-50 opacity-0 rounded-2xl z-10 transition-all'></div>
				<div className='absolute -bottom-24 group-hover/image:bottom-8 right-4 flex flex-col gap-3 text-lg text-primary transition-all z-30'>
					<div className='bg-white size-10 rounded-full flex justify-center items-center hover:bg-primary hover:text-white transition-all'>
						<CiShare2 />
					</div>
					<div className='bg-white size-10 rounded-full flex justify-center items-center hover:bg-primary hover:text-white transition-all'>
						<IoCartOutline />
					</div>
				</div>
				<div className='rounded-2xl overflow-hidden'>
					<img
						src={book.image}
						alt=''
						className='w-[250px] h-[350px] object-cover'
					/>
				</div>
				{book.discount !== 0 && (
					<div className='absolute top-5 left-0 px-4 py-1 rounded-r-full bg-star z-20'>
						<span className='text-white text-sm'>-{book.discount * 100}%</span>
					</div>
				)}
			</div>
			<div className='mt-4 flex flex-col gap-1'>
				<div className='flex items-center gap-1'>
					<FaStar className='text-star text-xs' />
					<span className='text-sm'>{book.rating}</span>
					<div className='flex items-center ml-2 text-cap'>
						<BsDot className='text-lg' />
						<span className='text-xs'>{book.numOfReviews} Reviews</span>
					</div>
				</div>
				<span className='text-primary text-sm font-medium'>{book.genre}</span>
				<h6 className='text-2xl font-bold hover:text-primary cursor-pointer transition-all'>
					{book.name}
				</h6>
				<span className='text-xs font-semibold text-cap'>{book.author}</span>
				<span className='text-xl font-bold'>$ {book.price.toFixed(2)}</span>
			</div>
		</div>
	)
}
