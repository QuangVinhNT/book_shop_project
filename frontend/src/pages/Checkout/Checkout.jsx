import Summary from '~/components/client/Summary/Summary'
import CheckoutInformation from './CheckoutInformation/CheckoutInformation'
import Bill from './Bill/Bill'
import { useRef, useState } from 'react'
import { useAuthStore } from '~/stores/authStore'
import { toast } from 'react-toastify'
import { environment } from '~/utils/environment'
import { useCartStore } from '~/stores/cartStore'

export default function Checkout() {
	const account = useAuthStore(state => state.account)
	const getProductIdsAndQuantity = useCartStore(state => state.getProductIdsAndQuantity)
	const cartItems = useCartStore(state => state.cartItems)

	const [full_name, setFullName] = useState(account.full_name)
	const [email, setEmail] = useState(account.email)
	const [phone_number, setPhoneNumber] = useState(account.phone_number)
	const [note, setNote] = useState('')

	const [paymentMethod, setPaymentMethod] = useState('COD')

	const [detail, setDetail] = useState(JSON.parse(account.address)?.detail)
	const [citySelected, setCitySelected] = useState(JSON.parse(account.address)?.city)
	const [districtSelected, setDistrictSelected] = useState(JSON.parse(account.address)?.district)
	const [wardSelected, setWardSelected] = useState(JSON.parse(account.address)?.ward)

	const handleCheckout = async () => {
		// Kiểm tra các trường bắt buộc
		if (!full_name || !email || !phone_number || !detail || !citySelected || !districtSelected || !wardSelected) {
			toast.error('Please fill in all information before payment!');
			return;
		}
		const checkoutData = {
			account_id: account.id,
			time: new Date(),
			order_status: 'PENDING',
			payment_status: 'UNPAID ',
			receiver_name: full_name,
			address: JSON.stringify({
				detail,
				city: citySelected,
				district: districtSelected,
				ward: wardSelected,
			}),
			phone_number,
			note,
			payment_method: paymentMethod,
			details: getProductIdsAndQuantity(),
			totalAmount: cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0)
		}

		const toastId = toast.loading('Please wait...')

		try {
			// Gửi yêu cầu đến backend
			const response = await fetch(`${environment.BACKEND_URL}/payment`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(checkoutData),
			});

			if (response.ok) {
				const data = await response.json();
				if (data.payment_url) {
					// Chuyển hướng đến VNPAY
					window.location.href = data.payment_url;
				}
			} else {
				const error = await response.json();
				toast.error(error.message || 'Checkout failed. Please try again.');
			}
		} catch (error) {
			console.error('Error:', error);
			toast.error('An error occurred while processing your payment.');
		} finally {
			toast.dismiss(toastId)
		}
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
