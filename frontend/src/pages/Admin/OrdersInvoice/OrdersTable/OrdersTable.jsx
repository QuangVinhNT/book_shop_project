import {
	FaAngleDown,
	FaChevronLeft,
	FaChevronRight,
	FaEye
} from 'react-icons/fa6'
import {IoMdOptions} from 'react-icons/io'
import {LuPencil} from 'react-icons/lu'

const recentOrders = [
	{
		orderId: '#302012',
		product: "Howl's Mooving",
		date: '1 min ago',
		customer: ['John Bushmil', 'Johnb@gmail.com'],
		total: 121,
		payment: 'VNPay',
		status: 'Processing'
	},
	{
		orderId: '#302011',
		product: "Howl's Mooving",
		date: '1 min ago',
		customer: ['Ilham Budi A', 'ilihambudi@gmail.com'],
		total: 590,
		payment: 'COD',
		status: 'Processing'
	},
	{
		orderId: '#302002',
		product: "Howl's Mooving",
		date: '5 hour ago',
		customer: ['Mohammad Karim', 'm_karim@gmail.com'],
		total: 125,
		payment: 'COD',
		status: 'Shipped'
	},
	{
		orderId: '#301901',
		product: "Howl's Mooving",
		date: '1 day ago',
		customer: ['Linda Blair', 'lindablair@gmail.com'],
		total: 348,
		payment: 'COD',
		status: 'Shipped'
	},
	{
		orderId: '#301900',
		product: "Howl's Mooving",
		date: '2 day ago',
		customer: ['Josh Adam', 'josh_adam@gmail.com'],
		total: 607,
		payment: 'VNPay',
		status: 'Delivered'
	},
	{
		orderId: '#301881',
		product: "Howl's Mooving",
		date: '5 Jan 2023',
		customer: ['Sin Tae', 'sin_tae@gmail.com'],
		total: 234,
		payment: 'VNPay',
		status: 'Cancelled'
	},
	{
		orderId: '#301643',
		product: "Howl's Mooving",
		date: '1 Jan 2023',
		customer: ['Rajesh Masvidal', 'rajesh_m@gmail.com'],
		total: 760,
		payment: 'VNPay',
		status: 'Shipped'
	},
	{
		orderId: '#301600',
		product: "Howl's Mooving",
		date: '24 Dec 2022',
		customer: ['Fajar Surya', 'fsurya@gmail.com'],
		total: 400,
		payment: 'Mastercard',
		status: 'Delivered'
	},
	{
		orderId: '#301555',
		product: "Howl's Mooving",
		date: '2 Dec 2022',
		customer: ['Francis Greg', 'francisg@gmail.com'],
		total: 812,
		payment: 'VNPay',
		status: 'Delivered'
	},
	{
		orderId: '#301002',
		product: "Howl's Mooving",
		date: '2 Dec 2022',
		customer: ['Linda Blair', 'lindablair@gmail.com'],
		total: 123,
		payment: 'VNPay',
		status: 'Delivered'
	}
]

export default function OrdersTable() {
	return (
		<div>
			<table className='w-full'>
				<thead className='text-sm'>
					<tr>
						<th className='bg-lightGray text-left rounded-tl-md'>
							<div className='p-4 flex items-center justify-between'>
								<input
									type='checkbox'
									className='size-5 cursor-pointer mx-auto'
								/>
							</div>
						</th>
						<th className='bg-lightGray font-medium text-cap p-4 text-left'>
							Order ID
						</th>
						<th className='bg-lightGray text-left'>
							<div className='flex items-center gap-5 font-medium text-cap p-4'>
								<span>Product</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='bg-lightGray text-left'>
							<div className='flex items-center gap-5 font-medium text-cap p-4'>
								<span>Product</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='bg-lightGray font-medium text-cap p-4 text-left'>
							Customer
						</th>
						<th className='bg-lightGray text-left'>
							<div className='flex items-center gap-5 font-medium text-cap p-4'>
								<span>Total</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='bg-lightGray font-medium text-cap p-4 text-left'>
							Payment
						</th>
						<th className='bg-lightGray text-left'>
							<div className='flex items-center gap-5 font-medium text-cap p-4'>
								<span>Status</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='bg-lightGray font-medium text-cap p-4 rounded-tr-md'>
							Action
						</th>
					</tr>
				</thead>
				<tbody className='text-sm'>
					{recentOrders.map((recentOrder, index) => {
						return (
							<tr key={index}>
								<td className='p-4 flex items-center justify-center border-t border-gray-300'>
									<input type='checkbox' className='size-5 cursor-pointer' />
								</td>
								<td className='border-t border-gray-300 px-4 text-primary font-medium'>
									{recentOrder.orderId}
								</td>
								<td className='border-t border-gray-300 px-4'>
									{recentOrder.product}
								</td>
								<td className='border-t border-gray-300 px-4'>
									{recentOrder.date}
								</td>
								<td className='border-t border-gray-300 px-4'>
									<div className=''>
										<span className='block font-medium'>
											{recentOrder.customer[0]}
										</span>
										<span className='block'>{recentOrder.customer[1]}</span>
									</div>
								</td>
								<td className='border-t border-gray-300 px-4'>
									${recentOrder.total.toFixed(2)}
								</td>
								<td className='border-t border-gray-300 px-4'>
									{recentOrder.payment}
								</td>
								<td className='border-t border-gray-300 px-4'>
									<div
										className={`${recentOrder.status.toLowerCase()}Status w-fit px-3 py-1 font-medium rounded-full`}
									>
										<span>{recentOrder.status}</span>
									</div>
								</td>
								<td className='border-t border-gray-300 px-4'>
									<div className='flex items-center gap-3 justify-center text-lg'>
										<FaEye className='transition-all hover:text-blue-500 cursor-pointer' />
										<LuPencil className='transition-all hover:text-star cursor-pointer' />
									</div>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<div className='flex justify-between items-center p-4 border-t border-gray-300'>
				<span className='text-gray-500 text-sm font-medium'>
					Showing 1-10 from 100
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
					<span className='text-primary bg-light text-xs p-2 rounded-lg size-8 text-center cursor-pointer transition-all hover:bg-primary hover:text-white font-medium'>
						4
					</span>
					<span className='text-primary bg-light text-xs p-2 rounded-lg size-8 text-center cursor-pointer transition-all hover:bg-primary hover:text-white font-medium'>
						5
					</span>
					<span className='text-primary bg-light text-xs p-2 rounded-lg size-8 text-center cursor-pointer transition-all hover:bg-primary hover:text-white font-medium'>
						...
					</span>
					<span className='text-primary bg-light text-xs p-2 rounded-lg cursor-pointer transition-all hover:bg-primary hover:text-white font-medium size-8 flex justify-center items-center'>
						<FaChevronRight />
					</span>
				</div>
			</div>
		</div>
	)
}
