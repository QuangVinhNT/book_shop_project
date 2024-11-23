import {PiClock} from 'react-icons/pi'
import {PiPaypalLogo} from 'react-icons/pi'
import {PiFlower} from 'react-icons/pi'
import {CiFaceSmile} from 'react-icons/ci'

const webFeatures = [
	{
		icon: <PiClock className='text-6xl text-primary' />,
		title: 'Quick Delivery',
		description:
			"Get your favourite books delivered fast! Because great stories shouldn't have to wait."
	},
	{
		icon: <PiPaypalLogo className='text-6xl text-primary' />,
		title: 'Secure Payment',
		description:
			'Shop with confidence! Your payment is safe and protected every step of the way.'
	},
	{
		icon: <PiFlower className='text-6xl text-primary' />,
		title: 'Best Quality',
		description:
			'Experience excellence with top-quality products tailored just for you!'
	},
	{
		icon: <CiFaceSmile className='text-6xl text-primary' />,
		title: 'Return Guarantee',
		description:
			'Shop worry-free! Enjoy hassle-free returns for your peace of mind.'
	}
]

export default function FeaturedWeb() {
	return (
		<div className='lg:px-[50px] 2xl:px-[100px] pt-6 pb-10 flex justify-center items-start bg-lighter'>
			{webFeatures.map((webFeature, index) => {
				return (
					<div
						key={index}
						className='flex flex-col items-center lg:px-6 2xl:px-11'
					>
						{webFeature.icon}
						<span className='inline-block my-3 font-semibold'>
							{webFeature.title}
						</span>
						<p className='text-xs text-center'>{webFeature.description}</p>
					</div>
				)
			})}
		</div>
	)
}
