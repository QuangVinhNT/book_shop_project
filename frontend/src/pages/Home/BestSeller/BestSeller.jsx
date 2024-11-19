import {BsArrowRight} from 'react-icons/bs'
import {BsArrowLeft} from 'react-icons/bs'

import featureBook1 from '~/assets/images/featured_book_1.png'
import BestSellerCard from './BestSellerCard/BestSellerCard'

const bestSellerBooks = [
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

export default function BestSeller() {
	return (
		<div>
			<h1 className='text-3xl font-semibold pl-20 my-10'>Best Seller</h1>
			<div className='relative'>
				<button className='bg-[#ffffffce] text-primary p-2 rounded-full absolute left-8 top-1/2 -translate-y-1/2 z-30 shadow-md transition-all hover:bg-primary hover:text-white'>
					<BsArrowLeft className='text-3xl' />
				</button>
				<div className='px-[50px] flex justify-between'>
					{bestSellerBooks.map((book, index) => {
						return <BestSellerCard key={index} book={book} />
					})}
				</div>
				<button className='bg-[#ffffffce] text-primary p-2 rounded-full absolute right-8 top-1/2 -translate-y-1/2 z-30 shadow-md transition-all hover:bg-primary hover:text-white'>
					<BsArrowRight className='text-3xl' />
				</button>
			</div>
		</div>
	)
}
