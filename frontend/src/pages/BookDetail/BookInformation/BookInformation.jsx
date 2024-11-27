import rating from '~/utils/rating'
import {IoCartOutline} from 'react-icons/io5'
import {FaPlus} from 'react-icons/fa6'
import {FaMinus} from 'react-icons/fa6'
import {useState} from 'react'

export default function BookInformation({book}) {
	const stars = rating(book.rating)
	const [quantity, setQuantity] = useState(1)
	return (
		<div className='flex px-14 pt-8'>
			<div className='flex flex-col py-10 2xl:pr-20 lg:pr-10 gap-5'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-1.5'>
						{stars.map((star, index) => {
							return <div key={index}>{star}</div>
						})}
					</div>
					<span className='text-xs text-primary font-medium'>
						{book.numOfReviews} Reviews
					</span>
				</div>
				<h3 className='text-2xl font-medium'>{book.name}</h3>
				<span className='text-xs font-medium'>{book.author}</span>
				<p className='text-xs text-cap font-light leading-5 text-justify'>
					{book.description}
				</p>
				<div className='flex items-center justify-between'>
					<span className='text-primary text-3xl font-semibold tracking-wider'>
						$ {(book.price - book.price * book.discount).toFixed(2)}
					</span>
					<div>
						<span className='text-gray-500 font-semibold line-through'>
							$ {book.price.toFixed(2)}
						</span>
						<span className='bg-customYellow text-sm text-primary font-medium px-2.5 py-1.5 rounded-md inline-block ml-2'>
							-{book.discount * 100}%
						</span>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='border-2 border-gray-200 rounded-md flex items-center'>
						<button
							className='px-4 h-full transition-all hover:bg-gray-100'
							onClick={() => setQuantity(quantity + 1)}
						>
							<FaPlus className='text-sm' />
						</button>
						<span className='px-4 py-2 text-xl inline-block w-16 text-center overflow-hidden'>
							{quantity}
						</span>
						<button
							className='px-4 h-full transition-all hover:bg-gray-100'
							onClick={() => {
								quantity > 0 ? setQuantity(quantity - 1) : setQuantity(0)
							}}
						>
							<FaMinus className='text-sm' />
						</button>
					</div>
					<button className='flex items-center gap-2 bg-primary text-white px-16 rounded-lg transition-all hover:brightness-125'>
						<IoCartOutline className='text-xl' />
						<span>Buy</span>
					</button>
				</div>
			</div>
			<div className='flex gap-6'>
				<div className='rounded-2xl overflow-hidden'>
					<img
						src={book.image}
						alt=''
						className='lg:w-[2000px] lg:h-[500px] 2xl:w-[2000px] 2xl:h-[550px] object-cover'
					/>
				</div>
				<div className='relative rounded-2xl overflow-hidden'>
					<div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>
					<img
						src={book.image}
						alt=''
						className='lg:w-[2000px] lg:h-[500px] 2xl:w-[2000px] 2xl:h-[550px] object-cover'
					/>
					<div className='absolute bottom-0 left-0 w-full h-fit text-white z-20 p-8'>
						<h6 className='font-bold text-lg'>Plot Summary</h6>
						<p className='text-[8px] leading-5 font-light'>
							{book.plotSummary}
						</p>
					</div>
				</div>
				<div className='flex flex-col justify-between'>
					<div className='w-[130px] h-[130px] rounded-lg overflow-hidden'>
						<img
							src={book.image}
							alt=''
							className='scale-[200%] translate-x-1/2 -translate-y-1/2'
						/>
					</div>
					<div className='w-[130px] h-[130px] rounded-lg overflow-hidden'>
						<img
							src={book.image}
							alt=''
							className='scale-[200%] translate-x-1/2 translate-y-1/2'
						/>
					</div>
					<div className='w-[130px] h-[130px] rounded-lg overflow-hidden'>
						<img
							src={book.image}
							alt=''
							className='scale-[200%] -translate-x-1/2 -translate-y-1/2'
						/>
					</div>
					<div className='w-[130px] h-[130px] rounded-lg overflow-hidden'>
						<img
							src={book.image}
							alt=''
							className='scale-[200%] -translate-x-1/2 translate-y-1/2'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
