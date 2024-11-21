import Summary from '~/components/client/Summary/Summary'
import CheckoutInformation from './CheckoutInformation/CheckoutInformation'
import Bill from './Bill/Bill'

export default function Checkout() {
	return (
		<div className='relative'>
			<div className='px-14 mt-10 mb-20'>
				<h1 className='text-2xl font-semibold mb-10 uppercase'>
					Delivery information
				</h1>
				<div className='flex gap-32 px-32'>
					<CheckoutInformation />
					<Bill />
				</div>
			</div>
			<Summary />
		</div>
	)
}
