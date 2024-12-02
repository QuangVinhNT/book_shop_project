import { FaAngleDown } from 'react-icons/fa6'
import { FaAngleRight } from 'react-icons/fa6'
import { useState } from 'react'
import { categories } from '~/utils/util'

export default function Filter({ selectedCategory, sortByPrice, setSelectedCategory, setCurrentPage, setSortByPrice, resetFilter }) {
	const [openCate, setOpenCate] = useState(true)
	const [openPrice, setOpenPrice] = useState(true)

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
						<div className='flex items-center gap-2'>
							<input
								type='radio'
								name='category'
								id={`cate-all`}
								checked={selectedCategory === null}
								onChange={() => {
									setSelectedCategory(null)
									setCurrentPage(1)
								}}
								className='cursor-pointer size-4 relative'
							/>
							<label
								className='text-sm inline-block text-cap cursor-pointer'
								htmlFor={`cate-all`}
							>
								All
							</label>
						</div>
						{categories.map((category, index) => {
							return (
								<div key={index} className='flex items-center gap-2'>
									<input
										type='radio'
										name='category'
										id={`cate${index}`}
										checked={selectedCategory === category.id}
										onChange={() => {
											setSelectedCategory(category.id)
											setCurrentPage(1)
										}}
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
						{/* <div className='group flex items-center gap-1 text-primary cursor-pointer'>
							<FaPlus className='text-[8px] leading-[1rem]' />
							<span className='text-xs group-hover:underline'>Load more</span>
						</div> */}
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
						className={`ml-5 flex flex-col gap-3 transition-all ${openPrice ? '' : '-mt-[100px]'
							}`}
					>
						<div className='flex items-center gap-2'>
							<input
								type='radio'
								name='orderPrice'
								checked={sortByPrice === null}
								id='orderPriceDef'
								onChange={() => setSortByPrice(null)}
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
								checked={sortByPrice === 'asc'}
								onChange={() => setSortByPrice('asc')}
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
								checked={sortByPrice === 'desc'}
								onChange={() => setSortByPrice('desc')}
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
					<button onClick={resetFilter} className='block w-60 py-3 rounded-lg border border-[#00000034] text-cap mt-2 transition-all hover:border-primary hover:text-primary'>
						Reset Filter
					</button>
				</div>
			</div>
		</div>
	)
}
