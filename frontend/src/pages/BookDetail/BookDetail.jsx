import FeaturedWeb from '~/components/client/FeaturedWeb/FeaturedWeb'
import BookInformation from './BookInformation/BookInformation'
import CustomerReviews from './CustomerReviews/CustomerReviews'
import Details from './Details/Details'
import RelatedBooks from './RelatedBooks/RelatedBooks'
import RelatedItems from './RelatedItems/RelatedItems'
import FlashSale from '~/components/client/FlashSale/FlashSale'

import book1 from '~/assets/images/book_1.png'
import bookThumbnails1 from '~/assets/images/book_thumbnails_1.png'
import bookThumbnails2 from '~/assets/images/book_thumbnails_2.png'
import bookThumbnails3 from '~/assets/images/book_thumbnails_3.png'
import bookThumbnails4 from '~/assets/images/book_thumbnails_4.png'
import { useBookStore } from '~/stores/bookStore'
import { useParams } from 'react-router-dom'
import { environment } from '~/utils/environment'
import { useEffect, useState } from 'react'

const book = {
	name: "Howl's Mooving Castle",
	author: 'Diana Wynne Jones',
	price: 20.0,
	discount: 0.02,
	categories: 'Literature & Fiction',
	language: 'English',
	format: '212 pp (first edition)',
	datePublished: 'April 1986',
	publisher: 'Greenwillow Books (US), Methuen (November 1986)',
	rating: 4.5,
	numOfReviews: 100,
	image: book1,
	thumbnails: [
		bookThumbnails1,
		bookThumbnails2,
		bookThumbnails3,
		bookThumbnails4
	],
	description: `Howl's Mooving Castle is a fantasy novel by British author Diana Wynne Jones, first published in 1986 by Greenwillow Books of New York. It was a runner-up for the annual Boston Globe-Horn Book Award, and won the Phoenix Award twenty years later. It was adapted into an animated film of the same name in 2004, which was nominated for the Academy Award for Best Animated Feature.`,
	plotSummary: `Sophie Hatter, an 18-year-old girl in the magical kingdom of Ingary, is cursed by the Witch of the Waste and transformed into an old woman. Leaving her mundane life behind, she becomes a cleaning lady for the enigmatic wizard Howl, whose moving castle hides many secrets. Sophie strikes a deal with Howl's fire demon, Calcifer, to break her curse in exchange for freeing Calcifer from his contract with Howl.
As Sophie unravels the mysteries of Howl's heart and the true nature of the Witch's curse, she discovers her own magical ability to bring objects to life. Facing dangers, unexpected revelations, and the Witch's schemes, Sophie and Howl confront their feelings for each other. In the end, Sophie breaks her curse, restores Howl's heart, and the two confess their love, setting the stage for a “happily ever after.”`
}

export default function BookDetail() {

	const [book, setBook] = useState(null)

	const { id } = useParams()

	const getBook = async () => {
		const response = await fetch(`${environment.BACKEND_URL}/product/${id}`, { credentials: 'include' })

		const data = await response.json()

		if(response.ok) {
			setBook(data.product)
		}
		else {
			setBook(null)
		}
	}

	useEffect(() => {
		getBook()
	}, [])

	if(!book) {
		return <div className='text-2xl text-red-500 text-center'>Loading....</div>
	}

	return (
		<div>
			<BookInformation book={book} />
			<div className='flex gap-10 px-14'>
				<div className='flex flex-col mt-16 w-3/4'>
					<Details book={book} />
					<CustomerReviews customerRating={4.5} />
				</div>
				<RelatedBooks />
			</div>
			<RelatedItems />
			<FeaturedWeb />
			<FlashSale />
		</div>
	)
}
