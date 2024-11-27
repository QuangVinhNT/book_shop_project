import {FaAngleDown, FaEye} from 'react-icons/fa6'
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
			<div className='flex items-center justify-between p-5'>
				<div className='flex items-center gap-2'>
					<span className='text-xl font-medium'>Recent Orders</span>
					<span className='font-medium text-customGreen bg-lighterGreen px-3 py-1 text-sm rounded-full'>
						+2 Orders
					</span>
				</div>
				<div className='flex items-center gap-3'>
					<button className='bg-white text-cap px-3 py-2 rounded-md flex items-center gap-2 transition border border-cap hover:border-primary hover:text-primary'>
						<IoMdOptions className='text-xl' />
						<span className='font-medium text-sm'>Filter</span>
					</button>
					<button className='text-sm font-medium bg-primary text-white px-3 py-2 rounded-md transition-all hover:brightness-125'>
						See More
					</button>
				</div>
			</div>
			<table className='w-full'>
				<thead className='text-sm'>
					<tr>
						<th className='text-left'>
							<div className='p-4 flex items-center justify-between'>
								<input
									type='checkbox'
									className='size-5 cursor-pointer mx-auto'
								/>
							</div>
						</th>
						<th className='font-medium text-cap p-4 text-left'>Order ID</th>
						<th className='text-left'>
							<div className='flex items-center gap-5 font-medium text-cap p-4'>
								<span>Product</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='text-left'>
							<div className='flex items-center gap-5 font-medium text-cap p-4'>
								<span>Product</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='font-medium text-cap p-4 text-left'>Customer</th>
						<th className='text-left'>
							<div className='flex items-center gap-5 font-medium text-cap p-4'>
								<span>Total</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='font-medium text-cap p-4 text-left'>Payment</th>
						<th className='text-left'>
							<div className='flex items-center gap-5 font-medium text-cap p-4'>
								<span>Status</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='font-medium text-cap p-4'>Action</th>
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
		</div>
	)
}
