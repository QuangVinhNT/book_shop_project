import rating from '~/utils/rating'
export default function TestimonialsCard({customer, style}) {
	const stars = rating(customer.rating)

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
