import user1 from '~/assets/images/customer_1.png'
import user4 from '~/assets/images/customer_4.png'
import TestimonialsCard from './TestimonialsCard/TestimonialsCard'

const users = [user1, user1, user1, user1]
const customers = [
	{
		name: 'An Nguyen',
		image: user4,
		rating: 3.5,
		feedback:
			'Fast delivery, secure payment, and excellent book quality. Highly recommended!',
		position: 1
	},
	{
		name: 'An Nguyen',
		image: user4,
		rating: 3.5,
		feedback:
			'Fast delivery, secure payment, and excellent book quality. Highly recommended!',
		position: 2
	},
	{
		name: 'An Nguyen',
		image: user4,
		rating: 3.5,
		feedback:
			'Fast delivery, secure payment, and excellent book quality. Highly recommended!',
		position: 3
	}
]

const styles = [
	{
		position: 1,
		style: 'absolute top-1/2 left-0 translate-x-1/4 -translate-y-1/2 h-[250px]'
	},
	{
		position: 2,
		style:
			'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-[270px]'
	},
	{
		position: 3,
		style:
			'absolute top-1/2 right-0 -translate-x-1/4 -translate-y-1/2 h-[250px]'
	}
]

export default function Testimonials() {
	return (
		<div className='flex'>
			<div className='w-1/3 py-28'>
				<h1 className='text-3xl font-semibold pl-20'>Testimonials</h1>
				<p className='text-xs font-light pl-20 my-5'>
					Our customers are always satisfied with the exceptional quality of our
					products and services.
				</p>
				<div className='flex gap-1 pl-20'>
					{users.length >= 3
						? users.slice(0, 3).map((customer, index) => {
								return (
									<div key={index} className='rounded-full overflow-hidden'>
										<img src={customer} alt='' />
									</div>
								)
						  })
						: users.map((customer, index) => {
								return (
									<div key={index}>
										<img src={customer} alt='' />
									</div>
								)
						  })}
					{users.length - 3 > 0 && (
						<div className='rounded-full overflow-hidden bg-lightGray size-10 flex justify-center items-center'>
							<span>+{users.length - 3}</span>
						</div>
					)}
				</div>
			</div>
			<div className='w-2/3 relative'>
				{customers.map((customer, index) => {
					const cardStyle = styles.filter(
						(style) => style.position === customer.position
					)
					return (
						<TestimonialsCard
							key={index}
							customer={customer}
							style={cardStyle[0].style}
						/>
					)
				})}
			</div>
		</div>
	)
}
