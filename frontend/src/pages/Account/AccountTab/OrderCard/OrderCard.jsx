export default function OrderCard({orderId, orderItems, orderPrice}) {
	return (
		<div className='flex flex-col py-10 gap-1'>
			<span className='text-sm text-primary font-semibold'>
				Order: #{orderId}
			</span>
			<div className='flex justify-between items-center'>
				<span className='text-sm font-semibold'>
					{orderItems
						.map((item) => item.quantity)
						.reduce((prev, cur) => prev + cur, 0)}{' '}
					items
				</span>
				<div className='flex gap-3'>
					<span className='font-semibold text-cap'>Total</span>
					<span className='font-semibold'>$ {orderPrice}</span>
				</div>
			</div>
			<div className='flex items-center gap-5 mt-3'>
				{orderItems.map((item, index) => {
					return (
						<div key={index} className='relative'>
							<img
								src={item.image}
								alt=''
								className='w-[120px] h-[170px] object-cover rounded-xl'
							/>
							<div className='absolute top-3 right-0 bg-[#ff7c01e1] text-white text-xs px-4 rounded-l-full'>
								{item.quantity}
							</div>
						</div>
					)
				})}
			</div>
			<hr className='border-primary mt-10' />
		</div>
	)
}
