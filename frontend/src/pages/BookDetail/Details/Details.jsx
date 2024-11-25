export default function Details({book}) {
	const detailContent = {
		'Book Title': book.name,
		Author: book.author,
		Categories: book.categories,
		Language: book.language,
		'Book Format': book.format,
		'Date Published': book.datePublished,
		Publisher: book.publisher
	}
	return (
		<div className='w-full'>
			<h1 className='text-3xl font-medium mb-8'>Details</h1>
			<div className='bg-lighter rounded-xl overflow-hidden'>
				{Object.keys(detailContent).map((detailKey, index) => {
					return (
						<div key={index} className='text-xs'>
							<span className='inline-block bg-[#4d4d4d] text-white w-56 leading-10 pl-7'>
								{detailKey}
							</span>
							<span className='inline-block text-[#4d4d4d] font-medium leading-10 pl-7'>
								{detailContent[detailKey]}
							</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}
