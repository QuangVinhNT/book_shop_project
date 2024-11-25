import Testimonials from '~/components/client/Testimonials/Testimonials'
import BookList from './BookList/BookList'
import Filter from './Filter/Filter'
import Suggest from './Suggest/Suggest'
import { useEffect, useState } from 'react'
import { environment } from '~/utils/environment'

export default function Books() {
	const [bookList, setBookList] = useState([])
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(3);
	const [pageCount, setPageCount] = useState(0);

	const getBookList = async () => {
		const response = await fetch(`${environment.BACKEND_URL}/products?page=${currentPage}&per_page=${itemsPerPage}`, {
			method: 'GET',
			credentials: 'include'
		})

		const data = await response.json()
		if (response.ok) {
			setPageCount(data.products.last_page)
			setBookList(data.products.data)
		}
	}

	const handlePageClick = (event) => {
		setCurrentPage(event.selected + 1);
	};

	useEffect(() => {
		getBookList()
	}, [currentPage])

	return (
		<div>
			<div className='flex gap-32 px-20 pt-10'>
				<Filter />
				<BookList handlePageClick={handlePageClick} pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} bookList={bookList} />
			</div>
			<Suggest />
			<Testimonials />
		</div>
	)
}
