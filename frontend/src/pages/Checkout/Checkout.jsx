import Summary from '~/components/client/Summary/Summary'
import CheckoutInformation from './CheckoutInformation/CheckoutInformation'
import Bill from './Bill/Bill'
import { useRef, useState } from 'react'
import { useAuthStore } from '~/stores/authStore'
import { toast } from 'react-toastify'

export default function Checkout() {
	const account = useAuthStore(state => state.account)

	const [full_name, setFullName] = useState(account.full_name)
	const [email, setEmail] = useState(account.email)
	const [phone_number, setPhoneNumber] = useState(account.phone_number)
	const [note, setNote] = useState('')

	const [paymentMethod, setPaymentMethod] = useState('COD')

	const [detail, setDetail] = useState(JSON.parse(account.address)?.detail)
	const [citySelected, setCitySelected] = useState(JSON.parse(account.address)?.city)
	const [districtSelected, setDistrictSelected] = useState(JSON.parse(account.address)?.district)
	const [wardSelected, setWardSelected] = useState(JSON.parse(account.address)?.ward)

	const handleCheckout = () => {
		// Kiểm tra các trường bắt buộc
		if (!full_name || !email || !phone_number || !detail || !citySelected || !districtSelected || !wardSelected) {
			toast.error('Please fill in all information before payment!');
			return;
		}
		const checkoutData = {
			full_name,
			email,
			phone_number,
			note, // note không bắt buộc
			paymentMethod,
			address: {
				detail,
				city: citySelected,
				district: districtSelected,
				ward: wardSelected,
			},
		};
	}

	return (
		<div className='relative'>
			<div className='px-14 mt-10 mb-20'>
				<h1 className='text-2xl font-semibold mb-10 uppercase'>
					Delivery information
				</h1>
				<div className='flex gap-32 px-32'>
					<CheckoutInformation
						detail={detail}
						setDetail={setDetail}
						citySelected={citySelected}
						setCitySelected={setCitySelected}
						districtSelected={districtSelected}
						setDistrictSelected={setDistrictSelected}
						setWardSelected={setWardSelected}
						wardSelected={wardSelected}
						paymentMethod={paymentMethod}
						setPaymentMethod={setPaymentMethod}
						note={note}
						setNote={setNote}
						email={email}
						full_name={full_name}
						phone_number={phone_number}
						setPhoneNumber={setPhoneNumber}
						setFullName={setFullName}
					/>
					<Bill
						handleCheckout={handleCheckout}
					/>
				</div>
			</div>
			<Summary />
		</div>
	)
}
