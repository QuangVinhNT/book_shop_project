import {FaStar} from 'react-icons/fa'
import {FaStarHalf} from 'react-icons/fa'

export default function rating(ratingNumber) {
	const stars = []
	const ratingSeparates = (ratingNumber + '').split('.')
	const decimalRating =
		typeof ratingSeparates[1] === 'undefined' ? 0 : +ratingSeparates[1]
	let coloredStar = 0
	let intRating = +ratingSeparates[0]
	if (decimalRating <= 5 && decimalRating > 0) {
		coloredStar += 1
		stars.push(
			<div className='relative'>
				<FaStarHalf key={'haft'} className='text-star absolute' />
				<FaStar key={'backStar'} className='text-uncoloredStar' />
			</div>
		)
	} else {
		intRating += decimalRating == 0 ? 0 : 1
	}
	coloredStar += intRating
	for (let i = 0; i < intRating; i++) {
		stars.unshift(<FaStar key={i} className='text-star' />)
	}
	let uncoloredStar = 5 - coloredStar
	for (let i = 0; i < uncoloredStar; i++) {
		stars.push(<FaStar key={'uncolored'} className='text-uncoloredStar' />)
	}
	return stars
}
