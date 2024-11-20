import {BsArrowRight} from 'react-icons/bs'
import {BsArrowLeft} from 'react-icons/bs'

import flashSaleBook1 from '~/assets/images/flash_sale_book_1.png'
import FlashSaleCard from './FlashSaleCard/FlashSaleCard'

const flashSaleBooks = [
	{
		name: 'Alev Saçlı Çocuk',
		author: 'Christine Nöstlinger',
		price: 19.23,
		discount: 0.5,
		numOfReviews: 100,
		genre: 'Novel',
		rating: 3.5,
		image: flashSaleBook1,
		position: 0
	},
	{
		name: 'Alev Saçlı Çocuk',
		author: 'Christine Nöstlinger',
		price: 19.23,
		discount: 0.5,
		numOfReviews: 100,
		genre: 'Novel',
		rating: 3.5,
		image: flashSaleBook1,
		position: 1
	}
]

export default function FlashSale() {
	return (
		<div className='bg-primary flex'>
			<div className='text-white w-1/3 py-28 mr-14'>
				<h1 className='text-3xl font-semibold lg:pl-14 2xl:pl-20 mb-5'>
					Flash Sale
				</h1>
				<p className='text-xs font-extralight lg:pl-14 2xl:pl-20'>
					{`Calling all book lovers! For a limited time, grab bestselling titles and timeless classics at unbeatable prices. Don't miss this chance to stock up your bookshelf - shop now before it's too late!`}
				</p>
			</div>
			<div className='relative'>
				<button className='bg-[#ffffff86] text-primary p-2 rounded-full absolute -left-6 top-1/2 -translate-y-1/2 z-30 shadow-md transition-all hover:bg-white'>
					<BsArrowLeft className='text-3xl' />
				</button>
				<div className='relative top-1/2 -translate-y-1/2 overflow-hidden'>
					{flashSaleBooks.map((book, index) => {
						const translateX = book.position * 50
						return (
							<div
								key={index}
								className='inline-block'
								style={{transform: `translateX(${translateX}px)`}}
							>
								<FlashSaleCard book={book} />
							</div>
						)
					})}
				</div>
				<button className='bg-[#ffffff86] text-primary p-2 rounded-full absolute -right-6 top-1/2 -translate-y-1/2 z-30 shadow-md transition-all hover:bg-white'>
					<BsArrowRight className='text-3xl' />
				</button>
			</div>
		</div>
	)
}
