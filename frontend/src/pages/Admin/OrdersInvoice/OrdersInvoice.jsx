import {GoPlus} from 'react-icons/go'
import {IoMdOptions} from 'react-icons/io'
import {MdOutlineCalendarToday} from 'react-icons/md'
import {PiExportBold} from 'react-icons/pi'
import OrdersTable from './OrdersTable/OrdersTable'

export default function OrdersInvoice() {
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
						<span className='font-medium text-sm'>Add Product</span>
					</button>
				</div>
			</div>
			<div className='flex justify-between items-center'>
				<div className='flex bg-white border border-gray-300 p-1 gap-1 rounded-md'>
					<div className='filterActive px-4 py-1 cursor-pointer transition-all rounded-md hover:bg-lighterBlue hover:text-darkBlue'>
						<span className='font-medium text-sm'>All Time</span>
					</div>
					<div className='px-4 py-1 cursor-pointer transition-all rounded-md hover:bg-lighterBlue hover:text-darkBlue'>
						<span className='font-medium text-sm'>12 Months</span>
					</div>
					<div className='px-4 py-1 cursor-pointer transition-all rounded-md hover:bg-lighterBlue hover:text-darkBlue'>
						<span className='font-medium text-sm'>30 Days</span>
					</div>
					<div className='px-4 py-1 cursor-pointer transition-all rounded-md hover:bg-lighterBlue hover:text-darkBlue'>
						<span className='font-medium text-sm'>7 Days</span>
					</div>
					<div className='px-4 py-1 cursor-pointer transition-all rounded-md hover:bg-lighterBlue hover:text-darkBlue'>
						<span className='font-medium text-sm'>24 Hour</span>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<button className='bg-white text-cap px-3 py-2 rounded-md flex items-center gap-2 transition border border-cap hover:border-primary hover:text-primary'>
						<MdOutlineCalendarToday className='text-xl' />
						<span className='font-medium text-sm'>Select Dates</span>
					</button>
					<button className='bg-white text-cap px-3 py-2 rounded-md flex items-center gap-2 transition border border-cap hover:border-primary hover:text-primary'>
						<IoMdOptions className='text-xl' />
						<span className='font-medium text-sm'>Filter</span>
					</button>
				</div>
			</div>
			<div className='bg-white border border-gray-300 shadow-roundShadow shadow-black/5 rounded-md my-5'>
				<OrdersTable />
			</div>
		</div>
	)
}
