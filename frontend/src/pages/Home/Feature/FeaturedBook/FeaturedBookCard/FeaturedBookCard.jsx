import {Link} from 'react-router-dom'

import {IoCartOutline} from 'react-icons/io5'
import rating from '~/utils/rating'

export default function FeaturedBookCard({book}) {
	const stars = rating(book.rating)

	return (
		<div className='bg-lightGray w-fit p-5 flex rounded-2xl'>
			<img src={book.image} alt='' width={200} />
			<div className='ml-7 flex flex-col justify-between'>
				<div className='flex items-center gap-5'>
					<span className='text-primary text-sm font-medium bg-light px-3 py-2 rounded-md'>
						{book.genre}
					</span>
					<div className='flex gap-1'>
						{stars.map((star, index) => {
							return <div key={index}>{star}</div>
						})}
					</div>
					<span className='text-xs text-[#7F72DC]'>
						{book.numOfReviews} Reviews
					</span>
				</div>
				<div>
					<span className='block font-semibold text-lg'>{book.name}</span>
					<span className='block text-sm text-cap font-semibold'>
						{book.author}
					</span>
				</div>
				<div className='flex gap-3 items-center'>
					<span className='text-3xl font-semibold tracking-wider text-primary'>
						${book.discountPrice.toFixed(2)}
					</span>
					<span className='text-lg font-semibold tracking-wider line-through text-darkGray decoration-darkGray'>
						${book.standardPrice.toFixed(2)}
					</span>
				</div>
				<div className='flex items-center gap-3'>
					<button className='flex items-center gap-5 bg-primary text-white py-3 px-6 rounded-lg transition-all hover:brightness-125'>
						<IoCartOutline className='text-3xl' />
						<span className='text-xl'>Add to cart</span>
					</button>
					<Link className='text-primary py-3 px-6 font-semibold hover:underline'>
						View Details
					</Link>
				</div>
			</div>
		</div>
	)
}
