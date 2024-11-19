import BookList from './BookList/BookList'
import Filter from './Filter/Filter'
import Suggest from './Suggest/Suggest'
import Testimonials from './Testimonials/Testimonials'

export default function Books() {
	return (
		<div>
			<div className='flex gap-32 px-20 pt-10'>
				<Filter />
				<BookList />
			</div>
			<Suggest />
			<Testimonials />
		</div>
	)
}
