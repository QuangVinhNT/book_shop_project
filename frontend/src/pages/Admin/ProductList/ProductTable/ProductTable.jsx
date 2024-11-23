import {FaAngleDown} from 'react-icons/fa'
import {FaAngleUp} from 'react-icons/fa'
import {FaEye} from 'react-icons/fa'
import {LuPencil} from 'react-icons/lu'
import {FaRegTrashAlt} from 'react-icons/fa'
import {useState} from 'react'

export default function ProductTable({products}) {
	// True: asc, False: desc
	const [sortingProduct, setSortingProduct] = useState(true)
	const [sortingPrice, setSortingPrice] = useState(true)
	const [sortingDate, setSortingDate] = useState(true)
	return (
		<table className='w-full mt-5 border-spacing-0 border-separate rounded-xl border-2 shadow-roundShadow shadow-gray-200 overflow-hidden'>
			<thead>
				<tr className='text-[15px]'>
					<th className='p-4 border-gray-500 rounded-xl text-left'>
						<div className='flex items-center'>
							<input type='checkbox' className='size-5 cursor-pointer' />
						</div>
					</th>
					<th
						className='pl-2 text-left cursor-pointer'
						onClick={() => setSortingProduct(!sortingProduct)}
					>
						<div className='flex items-center gap-5 font-medium text-cap'>
							<span>Product</span>
							{sortingProduct ? <FaAngleDown /> : <FaAngleUp />}
						</div>
					</th>
					<th className='pl-2 font-medium text-cap text-left'>Publisher</th>
					<th className='pl-2 font-medium text-cap text-left'>Category</th>
					<th className='pl-2'>
						<div className='flex items-center gap-5 font-medium text-cap'>
							<span>Price</span>
							{sortingPrice ? <FaAngleDown /> : <FaAngleUp />}
						</div>
					</th>
					<th className='pl-2 font-medium text-cap text-left'>Author</th>
					<th className='pl-2 text-left'>
						<div className='flex items-center gap-5 font-medium text-cap'>
							<span>Added</span>
							{sortingDate ? <FaAngleDown /> : <FaAngleUp />}
						</div>
					</th>
					<th className='pl-2 font-medium text-cap text-left'>Action</th>
				</tr>
			</thead>
			<tbody>
				{products.map((product, index) => {
					return (
						<tr key={index} className='text-[15px] bg-white'>
							<td className='p-4 border-t border-gray-300'>
								<div className='flex items-center'>
									<input type='checkbox' className='size-5 cursor-pointer' />
								</div>
							</td>
							<td className='pl-2 border-t border-gray-300'>{product.name}</td>
							<td className='pl-2 border-t border-gray-300'>
								{product.publisher}
							</td>
							<td className='pl-2 border-t border-gray-300'>
								{product.category}
							</td>
							<td className='pl-2 border-t border-gray-300'>
								${product.price.toFixed(2)}
							</td>
							<td className='pl-2 border-t border-gray-300'>
								{product.author}
							</td>
							<td className='pl-2 border-t border-gray-300'>
								{product.addedDate}
							</td>
							<td className='border-t border-gray-300 pl-2'>
								<div className='flex items-center gap-3 text-lg'>
									<FaEye className='text-xl cursor-pointer transition-all hover:text-blue-500' />
									<LuPencil className='cursor-pointer transition-all hover:text-star' />
									<FaRegTrashAlt className='cursor-pointer transition-all hover:text-red-500' />
								</div>
							</td>
						</tr>
					)
				})}
				<tr className='text-[15px] bg-white'>
					<td className='p-4 border-t border-gray-300' colSpan={3}>
						Showing 1-10 from 100
					</td>
					<td className='border-t border-gray-300' colSpan={5}>
						<div className='flex justify-end pr-8 gap-2'>
							<span className='size-8 text-center text-primary bg-light text-xs p-2 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white'>
								{'<'}
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
							<span className='size-8 text-center text-primary bg-light text-xs p-2 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white'>
								{'>'}
							</span>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	)
}
