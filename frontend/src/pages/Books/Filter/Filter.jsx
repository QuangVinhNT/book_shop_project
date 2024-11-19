import {FaAngleDown} from 'react-icons/fa6'
import {FaAngleRight} from 'react-icons/fa6'
import {FaPlus} from 'react-icons/fa'
import {useState} from 'react'

const categories = [
	{
		name: 'All Genres',
		isChecked: true
	},
	{
		name: 'Arts & Photography',
		isChecked: false
	},
	{
		name: 'Biographies & Memory',
		isChecked: false
	},
	{
		name: "Children's Book",
		isChecked: false
	},
	{
		name: 'Cookbook & Food',
		isChecked: false
	},
	{
		name: 'History',
		isChecked: false
	},
	{
		name: 'Literature & Fiction',
		isChecked: false
	},
	{
		name: 'Romance',
		isChecked: false
	},
	{
		name: 'Sicfi & Fantasy',
		isChecked: false
	},
	{
		name: 'Teen & Young Adult',
		isChecked: false
	}
]

export default function Filter() {
	const [openCate, setOpenCate] = useState(true)
	const [openPrice, setOpenPrice] = useState(false)

	return (
		<div className='w-[350px] h-fit border-r border-[#00000034] pr-10 pb-10'>
			<h1 className='text-4xl font-semibold mb-10'>Filter</h1>
			<div className='flex flex-col gap-7'>
				{/* Categories */}
				<div className='overflow-hidden'>
					<div
						className='flex items-center justify-between pr-10 bg-white relative z-10 cursor-pointer'
						onClick={() => setOpenCate(!openCate)}
					>
						<span className='text-lg font-semibold'>Categories</span>
						{openCate ? (
							<FaAngleDown className='text-primary' />
						) : (
							<FaAngleRight className='text-primary' />
						)}
					</div>
					<div
						className={`ml-10 flex flex-col gap-3 transition-all mt-4  
               ${openCate ? '' : '-mt-[335px]'}
            `}
					>
						{categories.map((category, index) => {
							return (
								<div key={index} className='flex items-center gap-2'>
									<input
										type='checkbox'
										name=''
										id={`cate${index}`}
										defaultChecked={category.isChecked}
										className='cursor-pointer size-4 relative'
									/>
									<label
										className='text-sm inline-block text-cap cursor-pointer'
										htmlFor={`cate${index}`}
									>
										{category.name}
									</label>
								</div>
							)
						})}
						<div className='group flex items-center gap-1 text-primary cursor-pointer'>
							<FaPlus className='text-[8px] leading-[1rem]' />
							<span className='text-xs group-hover:underline'>Load more</span>
						</div>
					</div>
				</div>
				{/* Publisher */}
				<div className='flex items-center justify-between pr-10 cursor-pointer'>
					<span className='text-lg font-semibold'>Publisher</span>
					<FaAngleRight className='text-primary' />
				</div>
				{/* Price */}
				<div className='overflow-hidden'>
					<div
						className='flex items-center justify-between pr-10 mb-4 bg-white relative z-10 cursor-pointer'
						onClick={() => setOpenPrice(!openPrice)}
					>
						<span className='text-lg font-semibold'>Price</span>
						{openPrice ? (
							<FaAngleDown className='text-primary' />
						) : (
							<FaAngleRight className='text-primary' />
						)}
					</div>
					<div
						className={`ml-5 flex flex-col gap-3 transition-all ${
							openPrice ? '' : '-mt-[100px]'
						}`}
					>
						<div className='flex items-center gap-2'>
							<input
								type='radio'
								name='orderPrice'
								id='orderPriceDef'
								defaultChecked={true}
								className='size-4 cursor-pointer'
							/>
							<label
								htmlFor='orderPriceDef'
								className='text-sm inline-block text-cap cursor-pointer'
							>
								Default
							</label>
						</div>
						<div className='flex items-center gap-2'>
							<input
								type='radio'
								name='orderPrice'
								id='orderPriceAsc'
								className='size-4 cursor-pointer'
							/>
							<label
								htmlFor='orderPriceAsc'
								className='text-sm inline-block text-cap cursor-pointer'
							>
								Ascending
							</label>
						</div>
						<div className='flex items-center gap-2'>
							<input
								type='radio'
								name='orderPrice'
								id='orderPriceDesc'
								className='size-4 cursor-pointer'
							/>
							<label
								htmlFor='orderPriceDesc'
								className='text-sm inline-block text-cap cursor-pointer'
							>
								Descending
							</label>
						</div>
					</div>
				</div>
				{/* Button */}
				<div className='font-semibold'>
					<button className='block bg-primary text-white w-60 py-3 rounded-lg transition-all hover:brightness-125'>
						Refine Search
					</button>
					<button className='block w-60 py-3 rounded-lg border border-[#00000034] text-cap mt-2 transition-all hover:border-primary hover:text-primary'>
						Reset Filter
					</button>
				</div>
			</div>
		</div>
	)
}
