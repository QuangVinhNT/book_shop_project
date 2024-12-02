import { AiOutlineUser } from 'react-icons/ai'
import { useState } from 'react'
import AccountInformation from './AccountTab/AccountInformation'
import Order from './AccountTab/Order'
import book1 from '~/assets/images/book_1.png'
import { Link } from 'react-router-dom'
import { useAuthStore } from '~/stores/authStore'
import ChangePassword from './AccountTab/ChangePassword'

const user = {
	firstName: 'Nguyễn',
	lastName: 'Trần Hoa',
	email: 'nth@gmail.com',
	phoneNumber: '123456789',
	password: '123456789',
	address: {
		detail: 'Cao Thắng',
		ward: 'Thanh Bình',
		district: 'Hải Châu',
		city: 'Đà Nẵng'
	},
	orders: [
		{
			id: '1234',
			processing: [
				{
					image: book1,
					quantity: 1,
					totalPrice: 30
				},
				{
					image: book1,
					quantity: 2,
					totalPrice: 60
				}
			],
			shipping: [
				{
					image: book1,
					quantity: 2,
					totalPrice: 30
				}
			],
			delivered: [],
			cancelled: []
		},
		{
			id: '5678',
			processing: [
				{
					image: book1,
					quantity: 2,
					totalPrice: 60
				}
			],
			shipping: [
				{
					image: book1,
					quantity: 1,
					totalPrice: 15
				}
			],
			delivered: [
				{
					image: book1,
					quantity: 3,
					totalPrice: 45
				}
			],
			cancelled: [
				{
					image: book1,
					quantity: 1,
					totalPrice: 15
				}
			]
		}
	]
}

export default function Account() {
	const [tabSelect, setTabSelect] = useState('Account information')

	const account = useAuthStore(state => state.account)

	return (
		<div className='px-28 mt-7 mb-14 flex gap-16'>
			<div className='bg-lessLighter pt-10 pb-32 pl-10 rounded-xl w-1/4 h-fit'>
				<div className='flex items-center gap-3 mb-6'>
					<AiOutlineUser className='text-2xl text-primary bg-light rounded-full size-10 p-2' />
					<span className='text-sm font-medium'>{account.full_name}</span>
				</div>
				<div className='flex flex-col gap-2 text-sm font-medium'>
					<span
						className={`${tabSelect === 'Account information'
							? 'text-primary cursor-default'
							: 'transition-all hover:underline hover:text-primary cursor-pointer'
							} `}
						onClick={() => setTabSelect('Account information')}
					>
						Account information
					</span>
					<span
						className={`${tabSelect === 'Order'
							? 'text-primary cursor-default'
							: 'transition-all hover:underline hover:text-primary cursor-pointer'
							} `}
						onClick={() => setTabSelect('Order')}
					>
						Order
					</span>
					<span
						className={`${tabSelect === 'Change password'
							? 'text-primary cursor-default'
							: 'transition-all hover:underline hover:text-primary cursor-pointer'
							} `}
						onClick={() => setTabSelect('Change password')}
					>
						Change password
					</span>
				</div>
			</div>
			<div className='w-3/4'>
				{tabSelect === 'Account information' && <AccountInformation account={account} />}
				{tabSelect === 'Order' && <Order account={account} orders={user.orders} />}
				{tabSelect === 'Change password' && <ChangePassword />}
			</div>
		</div>
	)
}
