import {FaRegTrashAlt} from 'react-icons/fa'
import {
	FaAngleDown,
	FaChevronLeft,
	FaChevronRight,
	FaEye
} from 'react-icons/fa6'
import {LuPencil} from 'react-icons/lu'

const customers = [
	{
		name: ['John Bushmill', 'johnbushmill@gmail.com'],
		phone: '07850548877',
		orders: 124,
		balance: 121,
		status: 'Blocked',
		created: '29 Dec 2022'
	},
	{
		name: ['Laura Prichet', 'laura_prichet@gmail.com'],
		phone: '0213023376',
		orders: 45,
		balance: 590,
		status: 'Active',
		created: '24 Dec 2022'
	},
	{
		name: ['Mohammad Karim', 'm_karim@gmail.com'],
		phone: '0504148778',
		orders: 984,
		balance: 125,
		status: 'Blocked',
		created: '12 Dec 2022'
	},
	{
		name: ['Josh Bill', 'josh_bill@gmail.com'],
		phone: '0217561276',
		orders: 99,
		balance: 348,
		status: 'Active',
		created: '21 Oct 2022'
	},
	{
		name: ['John Bushmill', 'johnbushmill@gmail.com'],
		phone: '07850548877',
		orders: 124,
		balance: 121,
		status: 'Blocked',
		created: '29 Dec 2022'
	},
	{
		name: ['John Bushmill', 'johnbushmill@gmail.com'],
		phone: '07850548877',
		orders: 124,
		balance: 121,
		status: 'Blocked',
		created: '29 Dec 2022'
	},
	{
		name: ['Laura Prichet', 'laura_prichet@gmail.com'],
		phone: '0213023376',
		orders: 45,
		balance: 590,
		status: 'Active',
		created: '24 Dec 2022'
	},
	{
		name: ['Mohammad Karim', 'm_karim@gmail.com'],
		phone: '0504148778',
		orders: 984,
		balance: 125,
		status: 'Active',
		created: '12 Dec 2022'
	},
	{
		name: ['Josh Bill', 'josh_bill@gmail.com'],
		phone: '0217561276',
		orders: 99,
		balance: 348,
		status: 'Blocked',
		created: '21 Oct 2022'
	},
	{
		name: ['John Bushmill', 'johnbushmill@gmail.com'],
		phone: '07850548877',
		orders: 124,
		balance: 121,
		status: 'Active',
		created: '29 Dec 2022'
	}
]

export default function CustomersTable() {
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
						<th className='bg-lightGray text-left'>
							<div className='flex items-center gap-5 font-medium text-cap p-4'>
								<span>Customer Name</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='bg-lightGray font-medium text-cap p-4 text-left'>
							Phone
						</th>
						<th className='bg-lightGray text-left'>
							<div className='flex items-center gap-5 font-medium text-cap p-4'>
								<span>Orders</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='bg-lightGray text-left'>
							<div className='flex items-center gap-5 font-medium text-cap p-4'>
								<span>Balance</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='bg-lightGray text-left'>
							<div className='flex items-center gap-5 font-medium text-cap p-4'>
								<span>Status</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='bg-lightGray text-left'>
							<div className='flex items-center gap-5 font-medium text-cap p-4'>
								<span>Created</span>
								<FaAngleDown />
							</div>
						</th>
						<th className='bg-lightGray font-medium text-cap p-4 rounded-tr-md'>
							Action
						</th>
					</tr>
				</thead>
				<tbody className='text-sm'>
					{customers.map((customer, index) => {
						return (
							<tr key={index}>
								<td className='p-4 flex items-center justify-center border-t border-gray-300'>
									<input type='checkbox' className='size-5 cursor-pointer' />
								</td>
								<td className='border-t border-gray-300 px-4'>
									<div className=''>
										<span className='block font-medium'>
											{customer.name[0]}
										</span>
										<span className='block'>{customer.name[1]}</span>
									</div>
								</td>
								<td className='border-t border-gray-300 px-4'>
									{customer.phone}
								</td>
								<td className='border-t border-gray-300 px-4'>
									{customer.orders}
								</td>
								<td className='border-t border-gray-300 px-4'>
									${customer.balance.toFixed(2)}
								</td>
								<td className='border-t border-gray-300 px-4'>
									<div
										className={`${customer.status.toLowerCase()}Status w-fit px-3 py-1 font-medium rounded-full`}
									>
										<span>{customer.status}</span>
									</div>
								</td>
								<td className='border-t border-gray-300 px-4'>
									{customer.created}
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
