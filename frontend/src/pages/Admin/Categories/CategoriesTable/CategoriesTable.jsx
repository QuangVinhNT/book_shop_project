import {FaRegTrashAlt} from 'react-icons/fa'
import {
	FaAngleDown,
	FaChevronLeft,
	FaChevronRight,
	FaEye
} from 'react-icons/fa6'
import {IoMdOptions} from 'react-icons/io'
import {LuPencil} from 'react-icons/lu'

const categories = [
	{
		name: 'Art & Photography',
		sale: 15020,
		description:
			'Category description here lorem ipsum dolor sit amet, consectetur'
	},
	{
		name: 'Art & Photography',
		sale: 15020,
		description:
			'Category description here lorem ipsum dolor sit amet, consectetur'
	},
	{
		name: 'Art & Photography',
		sale: 15020,
		description:
			'Category description here lorem ipsum dolor sit amet, consectetur'
	},
	{
		name: 'Art & Photography',
		sale: 15020,
		description:
			'Category description here lorem ipsum dolor sit amet, consectetur'
	},
	{
		name: 'Art & Photography',
		sale: 15020,
		description:
			'Category description here lorem ipsum dolor sit amet, consectetur'
	},
	{
		name: 'Art & Photography',
		sale: 15020,
		description:
			'Category description here lorem ipsum dolor sit amet, consectetur'
	},
	{
		name: 'Art & Photography',
		sale: 15020,
		description:
			'Category description here lorem ipsum dolor sit amet, consectetur'
	},
	{
		name: 'Art & Photography',
		sale: 15020,
		description:
			'Category description here lorem ipsum dolor sit amet, consectetur'
	},
	{
		name: 'Art & Photography',
		sale: 15020,
		description:
			'Category description here lorem ipsum dolor sit amet, consectetur'
	},
	{
		name: 'Art & Photography',
		sale: 15020,
		description:
			'Category description here lorem ipsum dolor sit amet, consectetur'
	}
]

export default function CategoriesTable() {
	return (
		<div>
			<table className='w-full'>
				<thead className='text-sm'>
					<tr>
						<th className='text-left bg-lightGray rounded-tl-md'>
							<div className='p-4 flex items-center justify-between'>
								<input
									type='checkbox'
									className='size-5 cursor-pointer mx-auto'
								/>
							</div>
						</th>
						<th className='text-left bg-lightGray'>
							<div className='flex items-center justify-between gap-5 font-medium text-cap p-4'>
								<span>Category</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='text-left bg-lightGray'>
							<div className='flex items-center justify-between gap-5 font-medium text-cap p-4'>
								<span>Sales</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='text-left bg-lightGray'>
							<div className='flex items-center justify-between gap-5 font-medium text-cap p-4'>
								<span>Description</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='font-medium text-cap p-4 bg-lightGray rounded-tr-md'>
							Action
						</th>
					</tr>
				</thead>
				<tbody className='text-sm'>
					{categories.map((category, index) => {
						return (
							<tr key={index}>
								<td className='p-4 flex items-center justify-center border-t border-gray-300'>
									<input type='checkbox' className='size-5 cursor-pointer' />
								</td>
								<td className='border-t border-gray-300 px-4 font-medium'>
									{category.name}
								</td>
								<td className='border-t border-gray-300 px-4'>
									{category.sale}
								</td>
								<td className='border-t border-gray-300 px-4'>
									{category.description}
								</td>
								<td className='border-t border-gray-300 px-4'>
									<div className='flex items-center gap-3 justify-center text-lg'>
										<FaEye className='transition-all hover:text-blue-500 cursor-pointer' />
										<LuPencil className='transition-all hover:text-star cursor-pointer' />
										<FaRegTrashAlt className='cursor-pointer transition-all hover:text-customRed' />
									</div>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<div className='flex justify-between items-center p-4 border-t border-gray-300'>
				<span className='text-gray-500 text-sm font-medium'>
					Showing 1-10 from 15
				</span>
				<div className='flex gap-2'>
					<span className='text-primary bg-light text-xs p-2 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white size-8 flex justify-center items-center'>
						<FaChevronLeft />
					</span>
					<span className='activePagination text-primary bg-light text-xs p-2 rounded-lg size-8 text-center cursor-pointer transition-all hover:bg-primary hover:text-white font-medium'>
						1
					</span>
					<span className='text-primary bg-light text-xs p-2 rounded-lg size-8 text-center cursor-pointer transition-all hover:bg-primary hover:text-white font-medium'>
						2
					</span>
					<span className='text-primary bg-light text-xs p-2 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white font-medium size-8 flex justify-center items-center'>
						<FaChevronRight />
					</span>
				</div>
			</div>
		</div>
	)
}
