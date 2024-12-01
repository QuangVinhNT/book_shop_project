import {IoCartOutline} from 'react-icons/io5'
import rating from '~/utils/rating'

export default function FlashSaleCard({book}) {
	const stars = rating(book.rating)
	return (
		<div className='w-fit flex rounded-2xl bg-dark p-5 gap-1'>
			<img src={book.image} alt='' className='lg:w-[125px] 2xl:w-[140px]' />
			<div className='lg:ml-2 2xl:ml-7 flex flex-col justify-between'>
				<div className='flex items-center lg:gap-2 2xl:gap-5'>
					<span className='text-primary text-xs font-medium bg-light lg:px-2.5 2xl:px-3 lg:py-1.5 2xl:py-2 rounded-md'>
						{book.genre}
					</span>
					<div className='flex lg:gap-0 2xl:gap-1'>
						{stars.map((star, index) => {
							return <div key={index}>{star}</div>
						})}
					</div>
					<span className='text-[10px] leading-[1rem] text-light'>
						{book.numOfReviews} Reviews
					</span>
				</div>
				<div>
					<span className='block font-semibold text-white cursor-pointer transition-all hover:text-primary'>
						{book.name}
					</span>
					<span className='block text-[10px] leading-[1rem] text-light font-semibold'>
						{book.author}
					</span>
				</div>
				<div className='flex lg:gap-1 2xl:gap-5 items-center'>
					<span className='lg:text-2xl 2xl:text-3xl font-semibold tracking-wider text-white'>
						${book.price.toFixed(2)}
					</span>
					<span className='text-lg font-semibold tracking-wider line-through text-darkGray decoration-darkGray'></span>
				</div>
				<div className='flex items-center gap-5'>
					<span className='text-star lg:text-base 2xl:text-xl'>
						Discount {book.discount * 100}%
					</span>
					<button className='bg-primary text-white size-10 flex justify-center items-center rounded-full transition-all hover:brightness-125'>
						<IoCartOutline className='text-2xl' />
					</button>
				</div>
			</div>
		</div>
	)
}
