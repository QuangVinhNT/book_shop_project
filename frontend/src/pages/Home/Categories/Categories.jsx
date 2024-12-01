import categoryArtsPhotography from '~/assets/images/category_arts_photography.png'
import CategoryCard from './CategoryCard/CategoryCard'

const categories = [
	{
		name: 'Arts & Photography',
		numOfItems: 110,
		image: categoryArtsPhotography,
		position: 0
	},
	{
		name: 'Travel',
		numOfItems: 110,
		image: categoryArtsPhotography,
		position: 1
	},
	{
		name: 'Novel',
		numOfItems: 110,
		image: categoryArtsPhotography,
		position: 2
	},
	{
		name: 'Fashion',
		numOfItems: 110,
		image: categoryArtsPhotography,
		position: 3
	}
]

export default function Categories() {
	return (
		<div className='overflow-hidden'>
			<div className='flex items-center justify-between'>
				<h1 className='text-3xl font-semibold pl-20 my-10'>Categories</h1>
				<div className='pr-10 flex gap-2'>
					<div className='activeCateBar h-1.5 rounded-full'></div>
					<div className='w-10 h-1.5 bg-inactiveBar rounded-full'></div>
					<div className='w-10 h-1.5 bg-inactiveBar rounded-full'></div>
				</div>
			</div>
			<div className='relative left-10 h-[200px]'>
				{categories.map((category, index) => {
					const leftPosition = category.position * 425
					return (
						<div
							key={index}
							className={`absolute`}
							style={{left: `${leftPosition}px`}}
						>
							<CategoryCard category={category} />
						</div>
					)
				})}
			</div>
		</div>
	)
}
