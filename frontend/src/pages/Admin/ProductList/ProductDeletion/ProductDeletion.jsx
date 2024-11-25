export default function ProductDeletion({product, setShowDeleteNoti}) {
	return (
		<>
			<div className='absolute z-10 bg-black opacity-30 top-0 left-0 right-0 bottom-0'></div>
			<div className='absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-7 w-[500px] rounded-xl'>
				<h2 className='text-center font-semibold text-xl mb-5'>
					Delete this product?
				</h2>
				<div>
					<div>
						<span className='font-semibold pr-1'>Product name:</span>
						<span>{product.name}</span>
					</div>
					<div>
						<span className='font-semibold pr-1'>Author:</span>
						<span>{product.author}</span>
					</div>
					<div>
						<span className='font-semibold pr-1'>Category:</span>
						<span>{product.category}</span>
					</div>
					<div>
						<span className='font-semibold pr-1'>Publisher:</span>
						<span>{product.publisher}</span>
					</div>
					<div>
						<span className='font-semibold pr-1'>Price:</span>
						<span>${product.price.toFixed(2)}</span>
					</div>
				</div>
				<div className='flex gap-2 justify-end mt-5 font-medium'>
					<button
						className='text-primary border border-transparent bg-light px-4 py-1.5 rounded-md transition-all hover:text-gray-300 hover:border-gray-300 hover:bg-white'
						onClick={() => {
							setShowDeleteNoti(false)
						}}
					>
						Cancel
					</button>
					<button
						className='text-white bg-primary px-4 py-1.5 rounded-md transition-all hover:bg-red-500'
						onClick={() => {
							setShowDeleteNoti(false)
						}}
					>
						Delete
					</button>
				</div>
			</div>
		</>
	)
}
