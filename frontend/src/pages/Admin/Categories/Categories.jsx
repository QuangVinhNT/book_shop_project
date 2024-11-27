import {GoPlus} from 'react-icons/go'
import {IoMdOptions} from 'react-icons/io'
import {IoSearch} from 'react-icons/io5'
import {PiExportBold} from 'react-icons/pi'
import CategoriesTable from './CategoriesTable/CategoriesTable'

export default function Categories() {
	return (
		<div className='pt-10 pb-5 px-5 bg-lightGray'>
			<div className='flex items-center justify-between mb-5'>
				<span className='text-2xl font-medium text-cap'>Order</span>
				<div className='flex items-center gap-3'>
					<button className='bg-light text-primary px-3 py-2 rounded-md flex items-center gap-2 transition border-2 border-transparent hover:border-primary'>
						<PiExportBold className='text-xl' />
						<span className='font-medium text-sm'>Export</span>
					</button>
					<button className='bg-primary text-white px-3 py-2 rounded-md flex items-center gap-1 transition hover:brightness-125'>
						<GoPlus className='text-2xl' />
						<span className='font-medium text-sm'>Add Category</span>
					</button>
				</div>
			</div>
			<div className='flex items-center justify-between'>
				<div className='flex items-center bg-white px-2 py-2 gap-2 rounded-lg border border-gray-300'>
					<IoSearch className='text-cap text-xl' />
					<input
						type='text'
						placeholder='Search category...'
						className='bg-transparent text-sm w-[250px]'
					/>
				</div>
				<button className='bg-white text-cap px-3 py-2 rounded-md flex items-center gap-2 transition border border-cap hover:border-primary hover:text-primary'>
					<IoMdOptions className='text-xl' />
					<span className='font-medium text-sm'>Filter</span>
				</button>
			</div>
			<div className='bg-white border border-gray-300 shadow-roundShadow shadow-black/5 rounded-md my-5'>
				<CategoriesTable />
			</div>
		</div>
	)
}
