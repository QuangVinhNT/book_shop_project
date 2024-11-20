import Testimonials from '~/components/client/Testimonials/Testimonials'
import BookList from './BookList/BookList'
import Filter from './Filter/Filter'
import Suggest from './Suggest/Suggest'

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
