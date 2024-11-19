import {BsArrowRight} from 'react-icons/bs'
import {BsArrowLeft} from 'react-icons/bs'
import SuggestBooksCard from './SuggestBooksCard/SuggestBooksCard'

import featureBook1 from '~/assets/images/featured_book_1.png'

const suggestBooks = [
	{
		name: 'Alev Saçlı Çocuk',
		author: 'Christine Nöstlinger',
		standardPrice: 20.0,
		discountPrice: 19.23,
		genre: 'Novel',
		rating: 3.5,
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
		image: featureBook1,
		position: 3
	}
	// {
	// 	name: 'Alev Saçlı Çocuk',
	// 	author: 'Christine Nöstlinger',
	// 	standardPrice: 20.0,
	// 	discountPrice: 19.23,
	// 	genre: 'Novel',
	// 	rating: 3.5,	//
	// 	image: featureBook1,
	// 	position: 4
	// },
	// {
	// 	name: 'Alev Saçlı Çocuk',
	// 	author: 'Christine Nöstlinger',
	// 	standardPrice: 20.0,
	// 	discountPrice: 19.23,
	// 	genre: 'Novel',
	// 	rating: 3.5,	//
	// 	image: featureBook1,
	// 	position: 5
	// }
]

export default function SuggestBooks() {
	return (
		<div className='relative'>
			<button className='bg-[#ffffffce] text-primary p-2 rounded-full absolute left-8 top-1/2 -translate-y-1/2 z-30 shadow-md transition-all hover:bg-primary hover:text-white'>
				<BsArrowLeft className='text-3xl' />
			</button>
			<div className='px-[50px] flex justify-between'>
				{suggestBooks.map((book, index) => {
					return <SuggestBooksCard key={index} book={book} />
				})}
			</div>
			<button className='bg-[#ffffffce] text-primary p-2 rounded-full absolute right-8 top-1/2 -translate-y-1/2 z-30 shadow-md transition-all hover:bg-primary hover:text-white'>
				<BsArrowRight className='text-3xl' />
			</button>
		</div>
	)
}
