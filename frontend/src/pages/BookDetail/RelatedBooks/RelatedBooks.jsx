import {FaStar} from 'react-icons/fa'
import book1 from '~/assets/images/book_1.png'

const relatedBooks = [
	{
		name: 'Alev Sacli Cocuk',
		author: 'Christine Nostlinger',
		price: 19.23,
		rating: 4.6,
		image: book1
	},
	{
		name: 'Alev Sacli Cocuk',
		author: 'Christine Nostlinger',
		price: 19.23,
		rating: 4.6,
		image: book1
	},
	{
		name: 'Alev Sacli Cocuk',
		author: 'Christine Nostlinger',
		price: 19.23,
		rating: 4.6,
		image: book1
	},
	{
		name: 'Alev Sacli Cocuk',
		author: 'Christine Nostlinger',
		price: 19.23,
		rating: 4.6,
		image: book1
	}
]

export default function RelatedBooks() {
	return (
		<div className=' mt-16'>
			<h1 className='text-3xl font-medium mb-8'>Related books</h1>
			<div className='flex flex-col gap-5'>
				{relatedBooks.map((book, index) => {
					return (
						<div key={index} className='flex items-end'>
							<img
								src={book.image}
								alt=''
								className='w-[170px] h-[230px] object-cover rounded-2xl translate-x-3'
							/>
							<div className='bg-white shadow-xl py-5 pl-7 pr-5 flex flex-col gap-2 w-64'>
								<div className='flex items-center gap-2 bg-star w-fit px-4 py-1 text-white text-sm rounded-full'>
									<FaStar />
									<span>{book.rating}</span>
								</div>
								<span className='font-semibold'>{book.name}</span>
								<span className='text-xs text-cap font-semibold'>
									{book.author}
								</span>
								<span className='text-primary text-lg font-semibold'>
									$ {book.price.toFixed(2)}
								</span>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
