import { CiGrid42 } from 'react-icons/ci'
import { IoIosList } from 'react-icons/io'
import BookCard from './BookCard/BookCard'

import book1 from '~/assets/images/book_1.png'
import ReactPaginate from 'react-paginate'
import { useState } from 'react'

// const books = [
// 	{
// 		name: 'Alev Saçlı Çocuk',
// 		author: 'Christine Nöstlinger',
// 		price: 20.0,
// 		discount: 0.1,
// 		genre: 'Novel',
// 		rating: 3.5,
// 		numOfReviews: 100,
// 		image: book1,
// 		position: 1,
// 		link: '/books/howlsmoovingcastle'
// 	},
// 	{
// 		name: 'Alev Saçlı Çocuk',
// 		author: 'Christine Nöstlinger',
// 		price: 20.0,
// 		discount: 0,
// 		genre: 'Novel',
// 		rating: 3.5,
// 		numOfReviews: 100,
// 		image: book1,
// 		position: 2,
// 		link: '/books/howlsmoovingcastle'
// 	},
// 	{
// 		name: 'Alev Saçlı Çocuk',
// 		author: 'Christine Nöstlinger',
// 		price: 20.0,
// 		discount: 0,
// 		genre: 'Novel',
// 		rating: 3.5,
// 		numOfReviews: 100,
// 		image: book1,
// 		position: 3,
// 		link: '/books/howlsmoovingcastle'
// 	},
// 	{
// 		name: 'Alev Saçlı Çocuk',
// 		author: 'Christine Nöstlinger',
// 		price: 20.0,
// 		discount: 0,
// 		genre: 'Novel',
// 		rating: 3.5,
// 		numOfReviews: 100,
// 		image: book1,
// 		position: 4,
// 		link: '/books/howlsmoovingcastle'
// 	},
// 	{
// 		name: 'Alev Saçlı Çocuk',
// 		author: 'Christine Nöstlinger',
// 		price: 20.0,
// 		discount: 0,
// 		genre: 'Novel',
// 		rating: 3.5,
// 		numOfReviews: 100,
// 		image: book1,
// 		position: 5,
// 		link: '/books/howlsmoovingcastle'
// 	},
// 	{
// 		name: 'Alev Saçlı Çocuk',
// 		author: 'Christine Nöstlinger',
// 		price: 20.0,
// 		discount: 0,
// 		genre: 'Novel',
// 		rating: 3.5,
// 		numOfReviews: 100,
// 		image: book1,
// 		position: 6,
// 		link: '/books/howlsmoovingcastle'
// 	},
// 	{
// 		name: 'Alev Saçlı Çocuk',
// 		author: 'Christine Nöstlinger',
// 		price: 20.0,
// 		discount: 0.2,
// 		genre: 'Novel',
// 		rating: 3.5,
// 		numOfReviews: 100,
// 		image: book1,
// 		position: 7,
// 		link: '/books/howlsmoovingcastle'
// 	},
// 	{
// 		name: 'Alev Saçlı Çocuk',
// 		author: 'Christine Nöstlinger',
// 		price: 20.0,
// 		discount: 0,
// 		genre: 'Novel',
// 		rating: 3.5,
// 		numOfReviews: 100,
// 		image: book1,
// 		position: 8,
// 		link: '/books/howlsmoovingcastle'
// 	},
// 	{
// 		name: 'Alev Saçlı Çocuk',
// 		author: 'Christine Nöstlinger',
// 		price: 20.0,
// 		discount: 0.5,
// 		genre: 'Novel',
// 		rating: 3.5,
// 		numOfReviews: 100,
// 		image: book1,
// 		position: 9,
// 		link: '/books/howlsmoovingcastle'
// 	}
// ]

export default function BookList({ bookList, pageCount, setCurrentPage, currentPage }) {
	return (
		<div className='w-full'>
			<div>
				<h1 className='text-4xl font-bold'>Books</h1>
				<div className='flex items-end justify-between'>
					<span className='text-xs text-cap font-medium'>
						Over 475+ books available here, find it now!
					</span>
					<div className='flex text-xl gap-2'>
						<div className='bg-primary p-2 text-white rounded-md cursor-pointer'>
							<CiGrid42 />
						</div>
						<div className='bg-light p-2 text-primary rounded-md cursor-pointer'>
							<IoIosList />
						</div>
					</div>
				</div>
			</div>
			<div className='mt-20 flex flex-wrap justify-between'>
				{bookList.map((book, index) => {
					return <BookCard book={book} key={index} />
				})}
			</div>
			{/* Pagination */}
			<div className='flex justify-center gap-2'>
				<ReactPaginate
					previousLabel={'<'}
					nextLabel={'>'}
					breakLabel={'...'}
					pageCount={pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={3}
					forcePage={currentPage - 1}
					onPageChange={(e) => setCurrentPage(+e.selected + 1)}
					containerClassName={'flex justify-center items-center gap-2'}
					pageClassName={
						'bg-light text-primary hover:bg-primary hover:text-white rounded-md flex'
					}
					pageLinkClassName={
						'text-xs font-semibold inline-block text-center leading-8 size-8 cursor-pointer transition-all'
					}
					previousClassName={
						'size-8 text-center text-primary bg-light text-xs p-2 rounded-md cursor-pointer transition-all hover:bg-primary hover:text-white'
					}
					nextClassName={
						'size-8 text-center text-primary bg-light text-xs p-2 rounded-md cursor-pointer transition-all hover:bg-primary hover:text-white'
					}
					activeClassName={'bg-primary text-white'}
				/>
				{/* <span className='text-primary bg-light text-xs p-2 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white'>
					Previous
				</span>
				<span className='activePagination text-primary bg-light text-xs p-2 rounded-lg size-8 text-center cursor-pointer transition-all hover:bg-primary hover:text-white'>
					1
				</span>
				<span className='text-primary bg-light text-xs p-2 rounded-lg size-8 text-center cursor-pointer transition-all hover:bg-primary hover:text-white'>
					2
				</span>
				<span className='text-primary bg-light text-xs p-2 rounded-lg size-8 text-center cursor-pointer transition-all hover:bg-primary hover:text-white'>
					3
				</span>
				<span className='text-primary bg-light text-xs p-2 rounded-lg size-8 text-center cursor-pointer transition-all hover:bg-primary hover:text-white'>
					...
				</span>
				<span className='text-primary bg-light text-xs p-2 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white'>
					Next
				</span> */}
			</div>
		</div>
	)
}
