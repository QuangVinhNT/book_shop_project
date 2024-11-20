import {FaStar} from 'react-icons/fa'
import {IoCartOutline} from 'react-icons/io5'

export default function RelatedItemsCard({book}) {
	return (
		<div className='w-fit flex rounded-2xl'>
			<img src={book.image} alt='' width={160} />
			<div className='lg:ml-2 2xl:ml-7 flex flex-col justify-between'>
				<div className='flex items-center gap-5'>
					<span className='text-primary text-sm font-medium bg-light px-3 py-2 rounded-md'>
						{book.genre}
					</span>
					<div className='flex gap-2 items-center bg-customYellow px-3 py-2 rounded-md'>
						<FaStar className='text-star' />
						<span className='text-sm text-primary font-medium'>
							{book.rating}
						</span>
					</div>
				</div>
				<div>
					<span className='block font-semibold text'>{book.name}</span>
					<span className='block text-xs text-cap font-semibold'>
						{book.author}
					</span>
				</div>
				<div className='flex lg:gap-1 2xl:gap-5 items-center'>
					<span className='lg:text-2xl 2xl:text-3xl font-semibold tracking-wider text-primary'>
						${book.discountPrice.toFixed(2)}
					</span>
					<span className='lg:text-base 2xl:text-lg font-semibold tracking-wider line-through text-darkGray decoration-darkGray'>
						${book.standardPrice.toFixed(2)}
					</span>
				</div>
				<button className='flex items-center lg:gap-3 2xl:gap-5 bg-primary text-white py-2 lg:px-3.5 2xl:px-6 rounded-lg transition-all hover:brightness-125'>
					<IoCartOutline className='text-2xl' />
					<span className='text-lg'>Add to cart</span>
				</button>
			</div>
		</div>
	)
}
