import {FaSave} from 'react-icons/fa'
import {LiaTimesSolid} from 'react-icons/lia'
import {FiPlus} from 'react-icons/fi'
import {Link} from 'react-router-dom'
import book1 from '~/assets/images/book_1.png'
import bookThumbnails1 from '~/assets/images/book_thumbnails_1.png'
import bookThumbnails2 from '~/assets/images/book_thumbnails_2.png'
import bookThumbnails3 from '~/assets/images/book_thumbnails_3.png'
import bookThumbnails4 from '~/assets/images/book_thumbnails_4.png'

const categories = ['Arts & Photography', 'Travel', 'Novel', 'Fashion']

const product = {
	name: "Howl's Mooving Castle",
	author: 'Diana Wynne Jones',
	price: 20.0,
	discount: 0.02,
	categories: 'Literature & Fiction',
	language: 'English',
	format: '212 pp (first edition)',
	datePublished: 'April 1986',
	publisher: 'Greenwillow Books (US), Methuen (November 1986)',
	quantity: 1,
	// image: book1,
	image: null,
	thumbnails: [
		bookThumbnails1,
		bookThumbnails2,
		bookThumbnails3
		// bookThumbnails4
	],
	description: `Howl's Mooving Castle is a fantasy novel by British author Diana Wynne Jones, first published in 1986 by Greenwillow Books of New York. It was a runner-up for the annual Boston Globe-Horn Book Award, and won the Phoenix Award twenty years later. It was adapted into an animated film of the same name in 2004, which was nominated for the Academy Award for Best Animated Feature.`,
	plotSummary: `Sophie Hatter, an 18-year-old girl in the magical kingdom of Ingary, is cursed by the Witch of the Waste and transformed into an old woman. Leaving her mundane life behind, she becomes a cleaning lady for the enigmatic wizard Howl, whose moving castle hides many secrets. Sophie strikes a deal with Howl's fire demon, Calcifer, to break her curse in exchange for freeing Calcifer from his contract with Howl.
As Sophie unravels the mysteries of Howl's heart and the true nature of the Witch's curse, she discovers her own magical ability to bring objects to life. Facing dangers, unexpected revelations, and the Witch's schemes, Sophie and Howl confront their feelings for each other. In the end, Sophie breaks her curse, restores Howl's heart, and the two confess their love, setting the stage for a “happily ever after.”`
}

export default function ProductUpdate() {
	return (
		<div>
			<div className='pt-10 pb-5 px-5 bg-lightGray'>
				<div className='flex items-center justify-between mb-5'>
					<span className='text-2xl font-medium text-cap'>Update Product</span>
					<div className='flex items-center gap-3'>
						<button className=' text-cap px-3 py-2 rounded-md flex items-center gap-2 transition border border-cap hover:border-red-500 hover:text-red-500'>
							<LiaTimesSolid className='text-xl' />
							<span className='font-medium text-sm'>Cancel</span>
						</button>
						<Link
							to={'/admin/products'}
							className='bg-primary text-white px-3 py-2 rounded-md flex items-center gap-1 transition hover:brightness-125'
						>
							<FaSave className='text-2xl mr-1' />
							<span className='font-medium text-sm'>Save</span>
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
									placeholder={product.name}
								/>
							</div>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Author
								</label>
								<input
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
									type='text'
									placeholder={product.author}
								/>
							</div>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Language
								</label>
								<input
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
									type='text'
									placeholder={product.language}
								/>
							</div>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Format
								</label>
								<input
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
									type='text'
									placeholder={product.format}
								/>
							</div>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Date Published
								</label>
								<input
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
									type='text'
									placeholder={product.datePublished}
								/>
							</div>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Publisher
								</label>
								<input
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
									type='text'
									placeholder={product.publisher}
								/>
							</div>
							<div className='mt-4 text-sm'>
								<label className='block font-medium text-cap' htmlFor=''>
									Plot Summary
								</label>
								<textarea
									name=''
									id=''
									placeholder={product.plotSummary}
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
									placeholder={product.description}
									className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none h-32'
								></textarea>
							</div>
						</div>

						{/* Media */}
						<div className='bg-white h-fit px-5 py-6 rounded-lg border border-gray-300'>
							<h6 className='font-medium text-lg mb-3'>Media</h6>
							<span className='block font-medium text-cap text-sm'>Photo</span>
							<div className='bg-lightGray flex flex-col gap-3 items-center p-5 mt-1 rounded-md border-2 boder-gray-300 border-dashed'>
								{product.image ? (
									<div className='relative'>
										<img
											src={product.image}
											alt=''
											className='w-[215px] h-[300px] object-cover'
										/>
										<LiaTimesSolid className='absolute right-2 top-2 bg-lightGray rounded-full p-1 size-5 transition-all hover:text-red-500 hover:bg-red-200 cursor-pointer' />
									</div>
								) : (
									<label className='cursor-pointer bg-light text-primary flex flex-col items-center justify-center gap-2 border border-dashed border-primary w-[215px] h-[300px] rounded-md transition-all hover:bg-primary hover:border-solid hover:text-white'>
										<FiPlus className='text-3xl' />
										<span className='font-medium'>Add Image</span>
									</label>
								)}
								<div className='flex items-center justify-center gap-2'>
									{product.thumbnails.map((thumbnail, index) => {
										return (
											<div key={index} className='relative'>
												<img
													src={thumbnail}
													alt=''
													className='w-[150px] h-[150px] object-cover'
												/>
												<LiaTimesSolid className='absolute right-2 top-2 bg-lightGray rounded-full p-1 size-5 transition-all hover:text-red-500 hover:bg-red-200 cursor-pointer' />
											</div>
										)
									})}
									{product.thumbnails.length < 4 && (
										<>
											<label
												htmlFor='thumbnail'
												className='cursor-pointer bg-light text-primary flex flex-col items-center justify-center gap-2 border border-dashed border-primary w-[150px] h-[150px] rounded-md transition-all hover:bg-primary hover:border-solid hover:text-white'
											>
												<FiPlus className='text-3xl' />
												<span className='font-medium'>Add Image</span>
											</label>
											<input
												type='file'
												name=''
												id='thumbnail'
												className='hidden'
											/>
										</>
									)}
								</div>
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
										placeholder={product.price}
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
									placeholder={product.discount * 100}
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
									placeholder={product.quantity}
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
							defaultValue={product.categories}
						>
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
		</div>
	)
}
