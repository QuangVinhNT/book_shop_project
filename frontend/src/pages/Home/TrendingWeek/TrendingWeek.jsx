import {BsArrowRight} from 'react-icons/bs'
import {BsArrowLeft} from 'react-icons/bs'

import bookTrending1 from '~/assets/images/book_trending_1.png'
import bookTrending2 from '~/assets/images/book_trending_2.png'
import bookTrending3 from '~/assets/images/book_trending_3.png'
import bookTrending4 from '~/assets/images/book_trending_4.png'
import bookTrending5 from '~/assets/images/book_trending_5.png'

const books = [
	{
		id: 1,
		img: bookTrending1,
		alt: 'bookTrending1',
		position: 1
	},
	{
		id: 2,
		img: bookTrending2,
		alt: 'bookTrending2',
		position: 2
	},
	{
		id: 3,
		img: bookTrending3,
		alt: 'bookTrending3',
		position: 3
	},
	{
		id: 4,
		img: bookTrending4,
		alt: 'bookTrending4',
		position: 4
	},
	{
		id: 5,
		img: bookTrending5,
		alt: 'bookTrending5',
		position: 5
	}
]

const styles = [
	{
		position: 1,
		style:
			'h-[350px] object-cover absolute left-1/2 top-1/2 -translate-x-[120%] -translate-y-1/2 z-0'
	},
	{
		position: 2,
		style:
			'h-[400px] object-cover absolute left-1/2 top-1/2 -translate-x-[85%] -translate-y-1/2 z-10'
	},
	{
		position: 3,
		style:
			'h-[450px] object-cover absolute left-1/2 top-1/2 -translate-x-1/2 z -translate-y-1/2 z-20'
	},
	{
		position: 4,
		style:
			'h-[400px] object-cover absolute left-1/2 top-1/2 -translate-x-[15%] -translate-y-1/2 z-10'
	},
	{
		position: 5,
		style:
			'h-[350px] object-cover absolute left-1/2 top-1/2 translate-x-[20%] -translate-y-1/2 z-0'
	}
]

export default function TrendingWeek() {
	return (
		<div className='h-screen'>
			<h3 className='py-10 text-center text-3xl font-semibold'>
				Trending this week
			</h3>
			<p className='text-center text-lg w-[700px] mx-auto'>
				{`Discover the hottest books everyone's talking about! From inspiring reads to thrilling stories, these picks are a must-read. Dive in and find your next favourite!`}
			</p>
			<div className='pt-10 relative h-[500px] w-[740px] mx-auto'>
				<button className='bg-[#ffffff80] p-2 rounded-full absolute left-0 top-1/2 -translate-y-1/2 z-30'>
					<BsArrowLeft className='text-primary text-3xl' />
				</button>
				{books.map((book) => {
					const imageStyle = styles.filter(
						(style) => style.position === book.position
					)
					return (
						<img
							key={book.id}
							src={book.img}
							alt={book.alt}
							className={imageStyle[0].style}
						/>
					)
				})}
				<button className='bg-[#ffffff80] p-2 rounded-full absolute right-0 top-1/2 -translate-y-1/2 z-30'>
					<BsArrowRight className='text-primary text-3xl' />
				</button>
			</div>
		</div>
	)
}
