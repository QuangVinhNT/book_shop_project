import topRatedBook1 from '~/assets/images/top_rated_book_1.png'
import topRatedBook2 from '~/assets/images/top_rated_book_2.png'

const ratedBooks = [
	topRatedBook2,
	topRatedBook2,
	topRatedBook2,
	topRatedBook2,
	topRatedBook2,
	topRatedBook2
]

export default function TopRatedBooks() {
	return (
		<div className='h-screen'>
			<h1 className='text-3xl font-semibold pl-20 my-10'>Top Rated Books</h1>
			<div className='lg:px-[150px] 2xl:px-[200px] flex gap-[80px]'>
				<img
					className='lg:w-[400px] 2xl:w-[450px] lg:h-[480px] 2xl:h-[570px] shadow-xl rounded-3xl'
					src={topRatedBook1}
					alt=''
				/>
				<div className='flex flex-wrap w-2/3 justify-between'>
					{ratedBooks.map((book, index) => {
						return (
							<img
								key={index}
								src={book}
								alt=''
								className='lg:w-[160px] 2xl:w-[200px] lg:h-[230px] 2xl:h-[275px] mb-5 rounded-3xl'
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}
