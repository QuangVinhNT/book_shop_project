import {GoPlus} from 'react-icons/go'
import {LiaTimesSolid} from 'react-icons/lia'
import {Link} from 'react-router-dom'
import {PiImageSquareFill} from 'react-icons/pi'

import {useState} from 'react'

const categories = ['Arts & Photography', 'Travel', 'Novel', 'Fashion']

export default function ProductAddition() {
	const [cateSelected, setCateSelected] = useState('')
	return (
		<div>
			<div className='pt-10 pb-5 px-5 bg-lightGray'>
				<div className='flex items-center justify-between mb-5'>
					<span className='text-2xl font-medium text-cap'>Add Product</span>
					<div className='flex items-center gap-3'>
						<button className=' text-cap px-3 py-2 rounded-md flex items-center gap-2 transition border border-cap hover:border-red-500 hover:text-red-500'>
							<LiaTimesSolid className='text-xl' />
							<span className='font-medium text-sm'>Cancel</span>
						</button>
						<Link
							to={'/admin/products'}
							className='bg-primary text-white px-3 py-2 rounded-md flex items-center gap-1 transition hover:brightness-125'
						>
							<GoPlus className='text-2xl' />
							<span className='font-medium text-sm'>Add Product</span>
						</Link>
					</div>
				</div>
				<div className='flex gap-5'>
					<div className='w-3/4 flex flex-col gap-5'>
						{/* General Information */}
						<div className='bg-white px-5 py-6 rounded-lg border border-gray-300'>
							<h6 className='font-medium text-lg mb-3'>General Information</h6>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Product Name
								</label>
								<input
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
									type='text'
									placeholder='Type product name here...'
								/>
							</div>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Author
								</label>
								<input
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
									type='text'
									placeholder='Type author here...'
								/>
							</div>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Language
								</label>
								<input
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
									type='text'
									placeholder='Type language here...'
								/>
							</div>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Format
								</label>
								<input
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
									type='text'
									placeholder='Type format here...'
								/>
							</div>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Date Published
								</label>
								<input
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
									type='text'
									placeholder='Type date published here...'
								/>
							</div>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Publisher
								</label>
								<input
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
									type='text'
									placeholder='Type publisher here...'
								/>
							</div>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Plot Summary
								</label>
								<textarea
									name=''
									id=''
									placeholder='Type plot summary here...'
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none h-32'
								></textarea>
							</div>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Description
								</label>
								<textarea
									name=''
									id=''
									placeholder='Type product description here...'
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none h-32'
								></textarea>
							</div>
						</div>

						{/* Media */}
						<div className='bg-white h-fit px-5 py-6 rounded-lg border border-gray-300'>
							<h6 className='font-medium text-lg mb-3'>Media</h6>
							<span className='block font-medium text-cap text-sm'>Photo</span>
							<div className='bg-lightGray flex flex-col gap-3 items-center p-5 mt-1 rounded-md border-2 boder-gray-300 border-dashed'>
								<div className='bg-[#efeffd] p-1 rounded-full'>
									<PiImageSquareFill className='text-primary bg-light size-8 p-1 rounded-full' />
								</div>
								<span className='text-sm text-cap'>
									Drag and drop image here, or click add image
								</span>
								<label
									htmlFor='addImg'
									className='cursor-pointer bg-light text-primary font-semibold border-2 transition-all hover:border-primary rounded-md px-4 py-1.5'
								>
									Add Image
								</label>
								<input
									type='file'
									accept='image/*'
									className='hidden'
									id='addImg'
								/>
							</div>
						</div>

						{/* Pricing */}
						<div className='bg-white h-fit px-5 py-6 rounded-lg border border-gray-300'>
							<h6 className='font-medium text-lg mb-3'>Pricing</h6>
							<div>
								<label
									className='block font-medium text-cap text-sm mt-4'
									htmlFor=''
								>
									Base Price
								</label>
								<div className='relative'>
									<span className='absolute inline-block top-1/2 -translate-y-1/2 mt-0.5 left-2 text-cap font-semibold'>
										$
									</span>
									<input
										type='number'
										placeholder='Type base price here...'
										className='bg-lightGray w-full pr-3 pl-6 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none text-sm'
									/>
								</div>
							</div>
							<div>
								<label
									className='block font-medium text-cap text-sm mt-4'
									htmlFor=''
								>{`Discount Percentage (%)`}</label>
								<input
									type='number'
									placeholder='Type discount percentage...'
									className='bg-lightGray w-full pr-3 pl-6 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none text-sm'
								/>
							</div>
							<div>
								<label
									className='block font-medium text-cap text-sm mt-4'
									htmlFor=''
								>
									Tax Class
								</label>
								<select
									name=''
									id=''
									className='text-sm bg-lightGray w-full px-3 py-2 mt-1 border border-gray-300 rounded-md cursor-pointer focus:outline-none text-cap'
								>
									<option value=''>Select a tax class</option>
								</select>
							</div>
						</div>

						{/* Inventory */}
						<div className='bg-white h-fit px-5 py-6 rounded-lg border border-gray-300'>
							<h6 className='font-medium text-lg mb-3'>Inventory</h6>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Quantity
								</label>
								<input
									type='number'
									placeholder='Type product quantity here...'
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
								/>
							</div>
						</div>
					</div>

					{/* Category */}
					<div className='bg-white w-1/4 h-fit px-5 py-6 rounded-lg border border-gray-300'>
						<h6 className='font-medium text-lg mb-3'>Category</h6>
						<label className='block font-medium text-cap text-sm' htmlFor=''>
							Product Category
						</label>
						<select
							name=''
							id=''
							className='text-sm bg-lightGray w-full px-3 py-2 mt-1 border border-gray-300 rounded-md cursor-pointer focus:outline-none'
							onChange={(e) => setCateSelected(e.target.value)}
						>
							{cateSelected === '' && (
								<option value='' className=''>
									Select a category
								</option>
							)}
							{categories.map((category, index) => {
								return (
									<option value={category} key={index}>
										{category}
									</option>
								)
							})}
							{/*  */}
						</select>
					</div>
				</div>
			</div>

			{/* Product Completion */}
			<div className='flex items-center justify-between p-5'>
				<div className='flex items-center gap-3 font-medium'>
					<h5>Product Completion</h5>
					<span className='bg-red-100 text-red-500 px-4 py-1.5 rounded-full text-sm'>
						0%
					</span>
				</div>
				<div className='flex items-center gap-3'>
					<button className=' text-cap px-3 py-2 rounded-md flex items-center gap-2 transition border border-cap hover:border-red-500 hover:text-red-500'>
						<LiaTimesSolid className='text-xl' />
						<span className='font-medium text-sm'>Cancel</span>
					</button>
					<Link
						to={'/admin/products/add'}
						className='bg-primary text-white px-3 py-2 rounded-md flex items-center gap-1 transition hover:brightness-125'
					>
						<GoPlus className='text-2xl' />
						<span className='font-medium text-sm'>Add Product</span>
					</Link>
				</div>
			</div>
		</div>
	)
}
