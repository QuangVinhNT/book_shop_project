import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {useAuthStore} from '~/stores/authStore'
import {environment} from '~/utils/environment'

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

export default function AccountInformation({account}) {
	const {register, handleSubmit} = useForm({
		defaultValues: {
			email: account.email,
			full_name: account.full_name,
			phone_number: account.phone_number
		}
	})

	const setAccount = useAuthStore((state) => state.setAccount)

	const [detailAddress, setDetailAddress] = useState(
		JSON.parse(account.address)?.detail
	)
	const [citySelected, setCitySelected] = useState(
		JSON.parse(account.address)?.city
	)
	const [districtSelected, setDistrictSelected] = useState(
		JSON.parse(account.address)?.district
	)
	const [wardSelected, setWardSelected] = useState(
		JSON.parse(account.address)?.ward
	)

	const handleUpdate = async (formData) => {
		if (detailAddress && !citySelected) {
			toast.warn('Select city')
			return
		} else if (citySelected && !districtSelected) {
			toast.warn('Select warn')
			return
		} else if (districtSelected && !wardSelected) {
			toast.warn('Select district')
			return
		}

		const toastId = toast.loading('Please wait...')

		try {
			const response = await fetch(
				`${environment.BACKEND_URL}/auth/change-profile`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						detailAddress
							? {
									...formData,
									address: JSON.stringify({
										detail: detailAddress,
										city: citySelected,
										district: districtSelected,
										ward: wardSelected
									})
							  }
							: {...formData}
					),
					credentials: 'include'
				}
			)

			const data = await response.json()

			if (response.ok) {
				setAccount(data.account)
				toast.update(toastId, {
					render: 'Update profile success',
					type: 'success',
					isLoading: false,
					autoClose: 3000
				})
			} else {
				toast.update(toastId, {
					render: 'Update profile failed',
					type: 'error',
					isLoading: false,
					autoClose: 3000
				})
			}
		} catch (error) {
			toast.update(toastId, {
				render: 'Internal server error',
				type: 'error',
				isLoading: false,
				autoClose: 3000
			})
		}
	}

	return (
		<div className='flex flex-col gap-10'>
			<form onSubmit={handleSubmit(handleUpdate)}>
				{/* Personal data */}
				<div className='flex flex-col gap-4'>
					<div className='flex gap-7'>
						<div className='flex flex-col w-1/2 gap-1'>
							<label
								className='text-sm text-gray-500 font-semibold'
								htmlFor='lastName'
							>
								Full Name
							</label>
							<input
								{...register('full_name')}
								className='border border-gray-300 text-sm px-3 py-1.5 rounded-lg focus:outline-none'
								type='text'
							/>
						</div>
					</div>
					<div className='flex gap-7'>
						<div className='flex flex-col w-1/2 gap-1'>
							<label
								className='text-sm text-gray-500 font-semibold'
								htmlFor='email'
							>
								Email
							</label>
							<input
								disabled
								value={account.email}
								className='border border-gray-300 text-sm px-3 py-1.5 rounded-lg focus:outline-none'
								type='email'
							/>
						</div>
						<div className='flex flex-col w-1/2 gap-1'>
							<label
								className='text-sm text-gray-500 font-semibold'
								htmlFor='phoneNumber'
							>
								Phone Number
							</label>
							<input
								{...register('phone_number')}
								className='border border-gray-300 text-sm px-3 py-1.5 rounded-lg focus:outline-none'
								type='text'
								placeholder={`${
									account.phoneNumber ? account.phoneNumber : ''
								}`}
							/>
						</div>
					</div>
				</div>

				{/* Address */}
				<div>
					<h6 className='text-sm text-gray-500 font-semibold mt-4'>Address</h6>
					<input
						value={detailAddress}
						onChange={(e) => setDetailAddress(e.target.value)}
						className='border border-gray-300 text-sm px-3 w-full py-1.5 rounded-lg focus:outline-none mb-4'
						type='text'
						placeholder={account.address?.detail}
					/>
					<div className='flex gap-3'>
						<div className='relative w-1/3'>
							<span className='absolute top-0 left-2 text-[9px] leading-[1rem]'>
								City
							</span>
							<select
								name=''
								id=''
								className='focus:outline-none border border-gray-300 rounded-lg py-3 pl-1 w-full cursor-pointer'
								onChange={(e) => {
									setCitySelected(e.target.value)
									setDistrictSelected('')
									setWardSelected('')
								}}
								value={citySelected}
							>
								<option value=''>Please select</option>
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
								disabled={!citySelected}
								name=''
								id=''
								className={`focus:outline-none border border-gray-300 rounded-lg py-3 pl-1 w-full cursor-pointer ${
									!citySelected && 'bg-lightGray'
								}`}
								onChange={(e) => {
									setDistrictSelected(e.target.value)
									setWardSelected('')
								}}
								value={districtSelected}
							>
								{citySelected &&
									cities
										?.filter((city) => city.name === citySelected)[0]
										?.districts?.map((district, index) => {
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
								disabled={!districtSelected}
								name=''
								id=''
								className={`focus:outline-none border border-gray-300 rounded-lg py-3 pl-1 w-full cursor-pointer ${
									!districtSelected && 'bg-lightGray'
								}`}
								onChange={(e) => {
									setWardSelected(e.target.value)
								}}
								value={wardSelected}
							>
								{districtSelected &&
									cities
										?.filter((city) => city.name === citySelected)[0]
										?.districts?.filter(
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
				</div>

				<div className='flex justify-end mt-4'>
					<button className='bg-primary text-white px-16 py-2 rounded-lg transition-all hover:brightness-125 cursor-pointer'>
						Update
					</button>
				</div>
			</form>
		</div>
	)
}
