import vnpayImg from '~/assets/images/vnpay.png'
import cashImg from '~/assets/images/cash.png'
import { useRef, useState } from 'react'
import { useAuthStore } from '~/stores/authStore'
import { useForm } from 'react-hook-form'

const cities = [
	{
		name: 'Hà Nội',
		districts: [
			{
				name: 'Ba Đình',
				wards: ['Phúc Xá', 'Trúc Bạch', 'Vĩnh Phúc', 'Cống Vị', 'Liễu Giai']
			},
			{
				name: 'Hoàn Kiếm',
				wards: ['Chương Dương', 'Hàng Bạc', 'Hàng Bồ', 'Hàng Đào', 'Hàng Gai']
			},
			{
				name: 'Cầu Giấy',
				wards: ['Quan Hoa', 'Nghĩa Đô', 'Dịch Vọng', 'Dịch Vọng Hậu']
			}
		]
	},
	{
		name: 'Đà Nẵng',
		districts: [
			{
				name: 'Hải Châu',
				wards: ['Hòa Thuận Tây', 'Hòa Thuận Đông', 'Nam Dương', 'Phước Ninh']
			},
			{
				name: 'Sơn Trà',
				wards: ['An Hải Bắc', 'An Hải Tây', 'Phước Mỹ', 'Thọ Quang']
			},
			{
				name: 'Ngũ Hành Sơn',
				wards: ['Hòa Hải', 'Hòa Quý', 'Khuê Mỹ']
			}
		]
	},
	{
		name: 'TP. Hồ Chí Minh',
		districts: [
			{
				name: 'Quận 1',
				wards: ['Bến Nghé', 'Bến Thành', 'Cầu Kho', 'Cầu Ông Lãnh']
			},
			{
				name: 'Quận 3',
				wards: ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4']
			},
			{
				name: 'Quận 7',
				wards: ['Tân Phong', 'Tân Phú', 'Phú Mỹ', 'Phú Thuận']
			}
		]
	}
]

export default function CheckoutInformation() {

	const [paymentMethod, setPaymentMethod] = useState('')

	const [detail, setDetail] = useState('')
	const [citySelected, setCitySelected] = useState('')
	const [districtSelected, setDistrictSelected] = useState('')
	const [wardSelected, setWardSelected] = useState('')

	const [isChecked, setIsChecked] = useState(false)

	const account = useAuthStore(state => state.account)
	const { register } = useForm({
		defaultValues: {
			full_name: account.full_name,
			email: account.email,
			phone_number: account.phone_number
		}
	})

	const handleCheck = () => {
		setIsChecked(!isChecked)
		if (!isChecked) {
			setDetail(JSON.parse(account.address).detail)
			setCitySelected(JSON.parse(account.address).city)
			setDistrictSelected(JSON.parse(account.address).district)
			setWardSelected(JSON.parse(account.address).ward)
		}
		else {
			setDetail('')
			setCitySelected('')
			setDistrictSelected('')
			setWardSelected('')
		}
	}

	return (
		<div className='w-2/3'>
			<div className='text-sm flex flex-col gap-4'>
				<input
					{...register('full_name')}
					type='text'
					placeholder='Name'
					className='focus:outline-none border border-gray-300 rounded-md w-full px-2 py-1'
				/>
				<div className='flex gap-6'>
					<input
						{...register('email')}
						type='email'
						placeholder='Email'
						className='focus:outline-none border border-gray-300 rounded-md w-3/5 px-2 py-1.5'
					/>
					<input
						{...register('phone_number')}
						type='text'
						placeholder='Phone number'
						className='focus:outline-none border border-gray-300 rounded-md w-2/5 px-2 py-1'
					/>
				</div>
				<div className='flex items-center justify-center gap-2'>
					<label>Use current address</label>
					<input type="checkbox"
						id="checkbox"
						checked={isChecked}
						onChange={handleCheck} />
				</div>
				<input
					// value={isChecked ? JSON.parse(account.address).detail : ''}
					onChange={e => setDetail(e.target.value)}
					value={detail}
					type='text'
					placeholder='Address'
					className='focus:outline-none border border-gray-300 rounded-md w-full px-2 py-1'
				/>
				<div className='flex gap-3'>
					<div className='relative w-1/3'>
						<span className='absolute top-0 left-2 text-[9px] leading-[1rem]'>
							City
						</span>
						<select
							value={citySelected}
							className='focus:outline-none border border-gray-300 rounded-lg py-3 pl-1 w-full cursor-pointer'
							onChange={(e) => {
								setCitySelected(e.target.value)
								setDistrictSelected('')
								setWardSelected('')
							}}
						>
							<option value=''>Choose city</option>
							{cities?.map((city, index) => {
								return (
									<option key={index} value={city.name}>
										{city.name}
									</option>
								)
							})}
						</select>
					</div>
					<div className='relative w-1/3'>
						<span className='absolute top-0 left-2 text-[9px] leading-[1rem]'>
							District
						</span>
						<select
							value={districtSelected}
							className={`focus:outline-none border border-gray-300 rounded-lg py-3 pl-1 w-full cursor-pointer ${!citySelected && 'bg-lightGray'
								}`}
							onChange={(e) => {
								setDistrictSelected(e.target.value)
								setWardSelected('')
							}}
						>
							<option value=''>Choose district</option>
							{citySelected &&
								cities
									?.filter((city) => city.name === citySelected)[0]
									.districts?.map((district, index) => {
										return (
											<option key={index} value={district.name}>
												{district.name}
											</option>
										)
									})}
						</select>
					</div>
					<div className='relative w-1/3'>
						<span className='absolute top-0 left-2 text-[9px] leading-[1rem]'>
							Ward
						</span>
						<select
							value={wardSelected}
							className={`focus:outline-none border border-gray-300 rounded-lg py-3 pl-1 w-full cursor-pointer ${!districtSelected && 'bg-lightGray'
								}`}
							onChange={(e) => {
								setWardSelected(e.target.value)
							}}
							disabled={!districtSelected}
						>
							<option value=''>Choose ward</option>
							{districtSelected &&
								cities
									?.filter((city) => city.name === citySelected)[0]
									.districts?.filter(
										(district) => district.name === districtSelected
									)[0]
									.wards?.map((ward, index) => {
										return (
											<option key={index} value={ward}>
												{ward}
											</option>
										)
									})}
						</select>
					</div>
				</div>
				<div className='flex flex-col gap-2'>
					<label className='font-semibold' htmlFor='txtArea'>
						Additional information
					</label>
					<textarea
						{...register('note')}
						id='txtArea'
						placeholder='Write notes for your application...'
						className='focus:outline-none border border-gray-300 rounded-lg p-2 h-32'
					></textarea>
				</div>
			</div>
			<div className='mt-10'>
				<span className='text-sm font-semibold inline-block mb-2'>
					Payment method
				</span>
				<div className='flex gap-10'>
					<div
						className={`flex items-center ${paymentMethod === 'COD' ? 'bg-primary text-white' : 'bg-light '
							} w-1/2 py-5 px-2 gap-3 font-medium rounded-xl cursor-pointer transition-all border-2 border-light hover:border-primary`}
						onClick={() => setPaymentMethod('COD')}
					>
						<img src={cashImg} alt='' className='w-20' />
						<span>{`Cash on Delivery (COD)`}</span>
					</div>
					<div
						className={`flex items-center ${paymentMethod === 'VNP' ? 'bg-primary text-white' : 'bg-light '
							} w-1/2 py-5 px-2 gap-3 font-medium rounded-xl cursor-pointer transition-all border-2 border-light hover:border-primary`}
						onClick={() => setPaymentMethod('VNP')}
					>
						<img src={vnpayImg} alt='' className='w-20' />
						<span>{`Payment by VNPay`}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
