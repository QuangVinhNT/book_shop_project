import {FaStar} from 'react-icons/fa'
import rating from '~/utils/rating'
import {FaAnglesDown, FaAnglesUp} from 'react-icons/fa6'
import {useState} from 'react'

const ratingStars = {
	'5S': 86,
	'4S': 61,
	'3S': 12,
	'2S': 5,
	'1S': 8
}

const reviews = [
	{
		customerName: 'Michelle Zudid',
		date: 'Jan 4th, 2024',
		content:
			'A captivating tale filled with magic, adventure, and heartwarming moments. The characters are unforgettable, and the story kept me hooked until the very end. Perfect fo anyone who loves fantasy and romance!',
		ratingStar: 4.5
	},
	{
		customerName: 'Michelle Zudid',
		date: 'Jan 4th, 2024',
		content:
			'A captivating tale filled with magic, adventure, and heartwarming moments. The characters are unforgettable, and the story kept me hooked until the very end. Perfect fo anyone who loves fantasy and romance!',
		ratingStar: 4
	},
	{
		customerName: 'Michelle Zudid',
		date: 'Jan 4th, 2024',
		content:
			'A captivating tale filled with magic, adventure, and heartwarming moments. The characters are unforgettable, and the story kept me hooked until the very end. Perfect fo anyone who loves fantasy and romance!',
		ratingStar: 4.5
	},
	{
		customerName: 'Michelle Zudid',
		date: 'Jan 4th, 2024',
		content:
			'A captivating tale filled with magic, adventure, and heartwarming moments. The characters are unforgettable, and the story kept me hooked until the very end. Perfect fo anyone who loves fantasy and romance!',
		ratingStar: 4
	}
]

export default function CustomerReviews({customerRating}) {
	const stars = rating(customerRating)
	const [showReview, setShowReview] = useState(false)

	return (
		<div className='w-full mt-10 relative overflow-hidden pb-16'>
			<h1 className='text-3xl font-medium pb-8 relative z-10 bg-white'>
				Customer Reviews
			</h1>
			<div className='bg-lighter rounded-xl px-12 py-16 flex items-center justify-between relative z-10'>
				<div>
					<div className='flex items-end'>
						<span className='text-5xl font-semibold tracking-wider pr-4'>
							{customerRating}
						</span>
						<span>out of 5</span>
					</div>
					<div className='flex gap-1 text-3xl mt-5'>
						{stars.map((star, index) => {
							return <div key={index}>{star}</div>
						})}
					</div>
				</div>
				<p className='lg:text-xs 2xl:text-sm text-cap font-medium w-1/4'>
					Discover what readers love about our bestselling books! From
					heartwarming stories to thrilling adventures, see why our titles are
					earning rave reviews.
				</p>
				<div className='flex flex-col gap-2'>
					{Object.keys(ratingStars).map((star) => {
						return (
							<div key={star} className='flex items-center'>
								<FaStar className='text-star text-lg' />
								<span className='inline-block w-4 mx-3 font-semibold'>
									{(star + '')[0]}
								</span>
								<div className='rounded-full h-2 lg:w-36 2xl:w-64 mr-3 bg-gray-300'>
									<div
										className='bg-star h-2 rounded-full'
										style={{width: `${ratingStars[star]}%`}}
									></div>
								</div>
								<span className='font-semibold'>{ratingStars[star]}%</span>
							</div>
						)
					})}
				</div>
			</div>
			<button
				className='group absolute bottom-14 bg-white translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center gap-1 text-sm shadow-lg rounded-full z-10 px-4 py-3 transition-all hover:bg-light'
				onClick={() => setShowReview(!showReview)}
			>
				{showReview ? (
					<>
						<FaAnglesUp className=' text-primary' />
						<span className='font-medium transition-all group-hover:text-primary'>
							Close
						</span>
					</>
				) : (
					<>
						<FaAnglesDown className=' text-primary' />
						<span className='font-medium transition-all group-hover:text-primary'>
							View reviews
						</span>
					</>
				)}
			</button>
			<div
				className={`transition-all ${
					showReview ? '-mt-0' : 'lg:-mt-[705px] 2xl:-mt-[650px]'
				}`}
			>
				{reviews.map((review, index) => {
					const stars = rating(review.ratingStar)
					return (
						<div
							key={index}
							className={`flex ${
								showReview ? 'border border-light' : ''
							} p-10 gap-6`}
						>
							<div className='flex flex-col gap-3'>
								<span className='text-star text-2xl font-semibold'>
									{review.ratingStar.toFixed(1)}
								</span>
								<div className='flex gap-1'>
									{stars.map((star, index) => {
										return (
											<div key={index} className='text-xl'>
												{star}
											</div>
										)
									})}
								</div>
							</div>
							<div>
								<h6 className='font-semibold'>{review.customerName}</h6>
								<span className='font-semibold text-primary text-xs'>
									{review.date}
								</span>
								<p className='text-cap font-semibold text-xs'>
									{review.content}
								</p>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
