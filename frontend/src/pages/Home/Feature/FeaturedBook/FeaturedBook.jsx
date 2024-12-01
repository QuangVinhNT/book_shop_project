import {BsArrowRight} from 'react-icons/bs'
import {BsArrowLeft} from 'react-icons/bs'

import FeaturedBookCard from './FeaturedBookCard/FeaturedBookCard'

import featureBook1 from '~/assets/images/featured_book_1.png'

const featuredBooks = [
	{
		name: 'Alev Saçlı Çocuk',
		author: 'Christine Nöstlinger',
		standardPrice: 20.0,
		discountPrice: 19.23,
		genre: 'Novel',
		rating: 3.5,
		numOfReviews: 100,
		image: featureBook1,
		position: 1
	},
	{
		name: 'Alev Saçlı Çocuk',
		author: 'Christine Nöstlinger',
		standardPrice: 20.0,
		discountPrice: 19.23,
		genre: 'Novel',
		rating: 3.5,
		numOfReviews: 100,
		image: featureBook1,
		position: 2
	},
	{
		name: 'Alev Saçlı Çocuk',
		author: 'Christine Nöstlinger',
		standardPrice: 20.0,
		discountPrice: 19.23,
		genre: 'Novel',
		rating: 3.5,
		numOfReviews: 100,
		image: featureBook1,
		position: 3
	},
	{
		name: 'Alev Saçlı Çocuk',
		author: 'Christine Nöstlinger',
		standardPrice: 20.0,
		discountPrice: 19.23,
		genre: 'Novel',
		rating: 3.5,
		numOfReviews: 100,
		image: featureBook1,
		position: 4
	},
	{
		name: 'Alev Saçlı Çocuk',
		author: 'Christine Nöstlinger',
		standardPrice: 20.0,
		discountPrice: 19.23,
		genre: 'Novel',
		rating: 3.5,
		numOfReviews: 100,
		image: featureBook1,
		position: 5
	}
]

const styles = [
	{
		position: 1,
		style:
			'absolute left-0 lg:-translate-x-[55%] 2xl:-translate-x-1/3 blur-sm opacity-0'
	},
	{
		position: 2,
		style:
			'absolute left-0 lg:-translate-x-[55%] 2xl:-translate-x-1/3 blur-sm opacity-100'
	},
	{
		position: 3,
		style: 'absolute left-1/2 -translate-x-1/2 opacity-100'
	},
	{
		position: 4,
		style:
			'absolute right-0 lg:translate-x-[55%] 2xl:translate-x-1/3 blur-sm opacity-100'
	},
	{
		position: 5,
		style:
			'absolute right-0 lg:translate-x-[55%] 2xl:translate-x-1/3 blur-sm opacity-0'
	}
]

export default function FeaturedBook() {
	return (
		<div>
			<h1 className='text-3xl font-semibold pl-20 my-10'>Featured Book</h1>
			<div className='relative h-[300px]'>
				<button className='bg-[#ffffff80] p-2 rounded-full absolute left-10 top-1/2 z-30'>
					<BsArrowLeft className='text-primary text-3xl' />
				</button>
				{featuredBooks.map((featuredBook, index) => {
					let position = featuredBook.position
					if (position < 2) {
						position = 1
					} else if (position > 4) {
						position = 5
					}
					const cardStyle = styles.filter(
						(style) => style.position === position
					)
					return (
						<div key={index} className={cardStyle[0].style}>
							<FeaturedBookCard book={featuredBook} />
						</div>
					)
				})}
				<button className='bg-[#ffffff80] p-2 rounded-full absolute right-10 top-1/2 z-30'>
					<BsArrowRight className='text-primary text-3xl' />
				</button>
			</div>
		</div>
	)
}
