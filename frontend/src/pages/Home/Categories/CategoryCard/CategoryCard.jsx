export default function CategoryCard({category}) {
	return (
		<div className='w-96 h-48 relative rounded-xl overflow-hidden'>
			<img src={category.image} alt='' className='w-full h-full' />
			<div className='absolute w-full h-full bg-primary opacity-30 top-0 left-0'></div>
			<div className='w-full absolute z-20 top-1/2 -translate-y-1/2 text-white'>
				<span className='block text-2xl text-center font-bold'>
					{category.name}
				</span>
				<span className='block text-sm text-center'>
					{category.numOfItems > 100 ? `+100` : category.numOfItems} item
				</span>
			</div>
		</div>
	)
}
