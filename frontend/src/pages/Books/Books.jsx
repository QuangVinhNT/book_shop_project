import Testimonials from '~/components/client/Testimonials/Testimonials'
import BookList from './BookList/BookList'
import Filter from './Filter/Filter'
import Suggest from './Suggest/Suggest'
import { useEffect, useState } from 'react'
import { environment } from '~/utils/environment'

export default function Books() {
	const [loading, setLoading] = useState(true)
	const [bookList, setBookList] = useState([])
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(3);
	const [pageCount, setPageCount] = useState(0);

	const [selectedCategory, setSelectedCategory] = useState(null)
	const [sortByPrice, setSortByPrice] = useState(null)

	const getBookList = async () => {
		setLoading(true)
		const params = new URLSearchParams();

		params.append('page', currentPage);
		params.append('per_page', itemsPerPage);

		if (selectedCategory) {
			params.append('category_id', selectedCategory);
		}

		if (sortByPrice) {
			params.append('sort_price', sortByPrice);
		}

		const queryString = params.toString();

		const response = await fetch(`${environment.BACKEND_URL}/products/filter?${queryString}`, {
			method: 'GET',
			credentials: 'include'
		})

		const data = await response.json()
		if (response.ok) {
			setPageCount(data.data.last_page)
			setBookList(data.data.data)
		}
		else {
			setBookList([])
		}

		setLoading(false)
	}

	const handlePageClick = (event) => {
		setCurrentPage(event.selected + 1);
	};

	useEffect(() => {
		getBookList()
	}, [currentPage, selectedCategory, sortByPrice])

	const resetFilter = () => {
		setSelectedCategory(null)
		setSortByPrice(null)
	}

	return (
		<div>
			<div className='flex gap-32 px-20 pt-10'>
				<Filter
				resetFilter={resetFilter}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					sortByPrice={sortByPrice}
					setSortByPrice={setSortByPrice}
					setCurrentPage={setCurrentPage}
				/>
				{loading && <div className='text-red-500 text-2xl'>Loading....</div>}
				{!loading &&
					<>
						{bookList.length === 0 && <div>No products found matching the provided filters</div>}
						{bookList.length > 0 &&
							<BookList handlePageClick={handlePageClick} pageCount={pageCount} currentPage={currentPage} setCurrentPage={setCurrentPage} bookList={bookList} />
						}
					</>
				}
			</div>
			<Suggest />
			<Testimonials />
		</div>
	)
}
