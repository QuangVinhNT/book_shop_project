import {FaAngleDown, FaChevronLeft, FaChevronRight} from 'react-icons/fa6'
import {IoMdOptions} from 'react-icons/io'

const topSellingProducts = [
	{
		product: "Howl's Mooving",
		sales: 401,
		amount: 84611,
		price: 121
	},
	{
		product: "Howl's Mooving",
		sales: 301,
		amount: 177000,
		price: 590
	},
	{
		product: "Howl's Mooving",
		sales: 300,
		amount: 37500,
		price: 125
	},
	{
		product: "Howl's Mooving",
		sales: 298,
		amount: 103704,
		price: 348
	},
	{
		product: "Howl's Mooving",
		sales: 256,
		amount: 150000,
		price: 607
	}
]

export default function TopSellingProductTable() {
	return (
		<div>
			<div className='flex items-center justify-between p-5'>
				<span className='text-xl font-medium'>Top Selling Product</span>
				<button className='bg-white text-cap px-3 py-2 rounded-md flex items-center gap-2 transition border border-cap hover:border-primary hover:text-primary'>
					<IoMdOptions className='text-xl' />
					<span className='font-medium text-sm'>Filter</span>
				</button>
			</div>
			<table className='w-full'>
				<thead>
					<tr>
						<th className='text-gray-500 font-medium bg-lightGray text-left'>
							<div className='flex items-center justify-between p-4'>
								<span>Product</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='text-gray-500 font-medium bg-lightGray text-left'>
							<div className='flex items-center justify-between p-4'>
								<span>Sales</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='text-gray-500 font-medium bg-lightGray text-left'>
							<div className='flex items-center justify-between p-4'>
								<span>Amount</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='p-4 text-gray-500 font-medium bg-lightGray text-left'>
							Price
						</th>
					</tr>
				</thead>
				<tbody>
					{topSellingProducts.map((topSellingProduct, index) => {
						return (
							<tr key={index}>
								<td className='px-4 py-6 border-t border-gray-300'>
									{topSellingProduct.product}
								</td>
								<td className='px-4 py-6 border-t border-gray-300'>
									{topSellingProduct.sales}
								</td>
								<td className='px-4 py-6 border-t border-gray-300'>
									{topSellingProduct.amount}
								</td>
								<td className='px-4 py-6 border-t border-gray-300'>
									{topSellingProduct.price}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<div className='flex justify-between items-center p-4 border-t border-gray-300'>
				<span className='text-gray-500 text-sm font-medium'>
					Showing 1-5 from 15
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
					<span className='text-primary bg-light text-xs p-2 rounded-lg size-8 text-center cursor-pointer transition-all hover:bg-primary hover:text-white font-medium'>
						3
					</span>
					<span className='text-primary bg-light text-xs p-2 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white font-medium size-8 flex justify-center items-center'>
						<FaChevronRight />
					</span>
				</div>
			</div>
		</div>
	)
}
