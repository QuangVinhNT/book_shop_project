import {FaStar} from 'react-icons/fa'
import {FaStarHalf} from 'react-icons/fa'
export default function TestimonialsCard({customer, style}) {
	const stars = []
	const ratingSeparates = (customer.rating + '').split('.')
	const decimalRating = +ratingSeparates[1]
	let coloredStar = 0
	let intRating = 0
	if (decimalRating <= 5) {
		intRating = +ratingSeparates[0]
		coloredStar += 1
		stars.push(
			<div className='relative'>
				<FaStarHalf key={'haft'} className='text-star absolute' />
				<FaStar key={'backStar'} className='text-uncoloredStar' />
			</div>
		)
	} else {
		intRating = +ratingSeparates[0] + 1
	}
	coloredStar += intRating
	for (let i = 0; i < intRating; i++) {
		stars.unshift(<FaStar key={i} className='text-star' />)
	}
	let uncoloredStar = 5 - coloredStar
	for (let i = 0; i < uncoloredStar; i++) {
		stars.push(<FaStar key={'uncolored'} className='text-uncoloredStar' />)
	}

	return (
		<div
			className={`flex flex-col items-center gap-2 bg-white shadow-2xl w-[450px] px-10 pt-5 ${style}`}
		>
			<img src={customer.image} alt='' className='size-20 rounded-full' />
			<span className='uppercase text-2xl font-semibold'>{customer.name}</span>
			<div className='flex gap-1'>
				{stars.map((star, index) => {
					return <div key={index}>{star}</div>
				})}
			</div>
			<p className='text-xs text-center'>{customer.feedback}</p>
		</div>
	)
}
