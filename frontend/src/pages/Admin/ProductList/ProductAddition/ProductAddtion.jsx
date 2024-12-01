import {GoPlus} from 'react-icons/go'
import {LiaTimesSolid} from 'react-icons/lia'
import {Link} from 'react-router-dom'
import {PiImageSquareFill} from 'react-icons/pi'

import {categories} from '~/utils/util'

import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {environment} from '~/utils/environment'
import {SwiperSlide, Swiper} from 'swiper/react'
import {Grid, Pagination} from 'swiper/modules'

import 'swiper/css/navigation'
import 'swiper/css/pagination'

// const categories = ['Arts & Photography', 'Travel', 'Novel', 'Fashion']

export default function ProductAddition() {
	const [imageIsRequired, setImageIsRequired] = useState(false)
	const [prodImages, setProdImages] = useState([])
	const [previewProdImages, setPreviewProdImages] = useState([])
	const [cateSelected, setCateSelected] = useState('')

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset,
		getValues
	} = useForm({
		defaultValues: {
			name: 'Sample Book',
			category_id: 1,
			price: 10.0,
			reduced_price: 8.0,
			quantity: 1,
			author: 'John Doe',
			language: 'English',
			format: 'Paperback',
			date_published: '2023-01-01',
			publisher: 'Default Publisher',
			description: 'This is a default description for the product.'
		},
		mode: 'onTouched'
	})

	const handleUploadProdImages = (e) => {
		const fileList = Array.from(e.target.files)
		const previewImages = fileList.reduce((result, file) => {
			const tempUrl = URL.createObjectURL(file)
			return [...result, tempUrl]
		}, [])

		setImageIsRequired(fileList.length === 0)
		setProdImages(fileList)
		setPreviewProdImages(previewImages)
	}

	const onSubmit = async (data) => {
		const toastId = toast.loading('Please wait...')
		try {
			const {images, ...productInfo} = data
			const imageDatas = new FormData()
			Array.from(images).forEach((image) => {
				imageDatas.append(`images[]`, image)
			})
			const responseImages = await fetch(`${environment.BACKEND_URL}/uploads`, {
				method: 'POST',
				body: imageDatas,
				credentials: 'include'
			})
			if (responseImages.ok) {
				const dataImages = await responseImages.json()
				const responseProduct = await fetch(
					`${environment.BACKEND_URL}/add-product`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							product_info: productInfo,
							images: dataImages.images
						}),
						credentials: 'include'
					}
				)
				if (responseProduct.ok) {
					const productData = await responseProduct.json()
					reset()
					toast.update(toastId, {
						render: data.message || 'Upload product success.',
						type: 'success',
						isLoading: false,
						autoClose: 3000
					})
					setPreviewProdImages([])
					setProdImages([])
				} else {
					toast.update(toastId, {
						render: data.message || 'Upload product failed.',
						type: 'error',
						isLoading: false,
						autoClose: 3000
					})
				}
			} else {
				toast.update(toastId, {
					render:
						data.message ||
						'Upload product failed size image <= 2048 kilobytes.',
					type: 'error',
					isLoading: false,
					autoClose: 3000
				})
			}
		} catch (error) {
			console.log(error)
			toast.update(toastId, {
				render: 'Internal server error.',
				type: 'error',
				isLoading: false,
				autoClose: 3000
			})
		}
	}

	const onError = (data) => {
		setImageIsRequired(prodImages.length === 0)
	}

	return (
		<div>
			<div className='pt-10 pb-5 px-5 bg-lightGray'>
				<form onSubmit={handleSubmit(onSubmit, onError)} className=''>
					<div className='flex items-center justify-between mb-5'>
						<span className='text-2xl font-medium text-cap'>Add Product</span>
						<div className='flex items-center gap-3'>
							<Link to={'/admin/products'}>
								<button className=' text-cap px-3 py-2 rounded-md flex items-center gap-2 transition border border-cap hover:border-red-500 hover:text-red-500'>
									<LiaTimesSolid className='text-xl' />
									<span className='font-medium text-sm'>Cancel</span>
								</button>
							</Link>
							<button className='bg-primary text-white px-3 py-2 rounded-md flex items-center gap-1 transition hover:brightness-125'>
								<GoPlus className='text-2xl' />
								<span className='font-medium text-sm'>Add Product</span>
							</button>
						</div>
					</div>
					<div className='flex gap-5'>
						<div className='w-3/4 flex flex-col gap-5'>
							{/* General Information */}
							<div className='bg-white px-5 py-6 rounded-lg border border-gray-300'>
								<h6 className='font-medium text-lg mb-3'>
									General Information
								</h6>

								{/* Product Name */}
								<div className='mt-4 text-sm'>
									<label className='block font-medium text-cap' htmlFor=''>
										Product Name
									</label>
									<input
										{...register('name', {
											required: 'Name is required',
											minLength: {
												value: 3,
												message: 'Name must be at least 3 characters long'
											}
										})}
										className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
										type='text'
										placeholder='Type product name here...'
									/>
									{errors.name && (
										<p className='text-red-500 text-sm'>
											{errors.name.message}
										</p>
									)}
								</div>

								{/* Author */}
								<div className='mt-4 text-sm'>
									<label className='block font-medium text-cap' htmlFor=''>
										Author
									</label>
									<input
										{...register('author', {
											required: 'Author is required',
											minLength: {
												value: 3,
												message:
													'Author name must be at least 3 characters long'
											}
										})}
										className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
										type='text'
										placeholder='Type author here...'
									/>
									{errors.author && (
										<p className='text-red-500 text-sm'>
											{errors.author.message}
										</p>
									)}
								</div>

								{/* Language */}
								<div className='mt-4 text-sm'>
									<label className='block font-medium text-cap' htmlFor=''>
										Language
									</label>
									<input
										{...register('language', {
											required: 'Language is required'
										})}
										className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
										type='text'
										placeholder='Type language here...'
									/>
									{errors.language && (
										<p className='text-red-500 text-sm'>
											{errors.language.message}
										</p>
									)}
								</div>

								{/* Format */}
								<div className='mt-4 text-sm'>
									<label className='block font-medium text-cap' htmlFor=''>
										Format
									</label>
									<input
										{...register('format', {required: 'Format is required'})}
										className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
										type='text'
										placeholder='Type format here...'
									/>
									{errors.format && (
										<p className='text-red-500 text-sm'>
											{errors.format.message}
										</p>
									)}
								</div>

								{/* Date Published */}
								<div className='mt-4 text-sm'>
									<label className='block font-medium text-cap' htmlFor=''>
										Date Published
									</label>
									<input
										{...register('date_published', {
											required: 'Date published is required'
										})}
										className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
										type='text'
										placeholder='Type date published here...'
									/>
									{errors.date_published && (
										<p className='text-red-500 text-sm'>
											{errors.date_published.message}
										</p>
									)}
								</div>

								{/* Publisher */}
								<div className='mt-4 text-sm'>
									<label className='block font-medium text-cap' htmlFor=''>
										Publisher
									</label>
									<input
										{...register('publisher', {
											required: 'Publisher is required',
											minLength: {
												value: 3,
												message:
													'Publisher name must be at least 3 characters long'
											}
										})}
										className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
										type='text'
										placeholder='Type publisher here...'
									/>
									{errors.publisher && (
										<p className='text-red-500 text-sm'>
											{errors.publisher.message}
										</p>
									)}
								</div>

								{/* Description */}
								<div className='mt-4 text-sm'>
									<label className='block font-medium text-cap' htmlFor=''>
										Description
									</label>
									<textarea
										{...register('description', {
											required: 'Description is required'
										})}
										placeholder='Type product description here...'
										className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none h-32'
									></textarea>
									{errors.description && (
										<p className='text-red-500 text-sm'>
											{errors.description.message}
										</p>
									)}
								</div>
							</div>

							{/* Image */}
							<div className='bg-white px-5 py-6 rounded-lg border border-gray-300'>
								<h6 className='font-medium text-lg mb-3'>Media</h6>
								<span className='block font-medium text-cap'>Photo</span>
								<div className='md:col-span-2'>
									<div className='bg-lightGray border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-between gap-2 py-10 px-5 relative'>
										<PiImageSquareFill className='text-primary bg-light size-10 p-1.5 rounded-full' />
										<span className='text-sm text-cap'>
											Drag and drop image here, or click add image
										</span>
										<label
											className='bg-light text-primary font-semibold px-4 py-1.5 rounded-md cursor-pointer border-2 border-transparent hover:border-primary transition-all'
											htmlFor='multiple_files'
										>
											Add Image
										</label>
										<input
											{...register('images', {
												required: 'Images is required'
											})}
											onChange={(e) => handleUploadProdImages(e)}
											id='multiple_files'
											type='file'
											className='opacity-0 absolute'
											multiple
										/>
										{errors.images &&
											prodImages.length === 0 &&
											imageIsRequired && (
												<p className='text-red-500 text-sm'>
													{errors.images.message}
												</p>
											)}
										<div className='mt-5 w-full'>
											<Swiper
												slidesPerView={4}
												spaceBetween={0}
												pagination={{
													clickable: true
												}}
												navigation={{
													nextEl: '.swiper-button-next',
													prevEl: '.swiper-button-prev'
												}}
												modules={[Grid, Pagination]}
												className='mySwiper'
											>
												{previewProdImages &&
													previewProdImages.map((tempUrl, index) => (
														<SwiperSlide key={index}>
															<div className='w-[150px] h-[220px] flex items-center justify-center p-4'>
																<img
																	src={tempUrl}
																	className='w-full h-full object-cover pb-5'
																/>
															</div>
														</SwiperSlide>
													))}
											</Swiper>
										</div>
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
											{...register('price', {
												required: 'Price is required',
												min: {
													value: 0.01,
													message: 'Price must be greater than 0'
												}
											})}
											type='number'
											placeholder='Type base price here...'
											className='bg-lightGray w-full pr-3 pl-6 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none text-sm'
										/>
										{errors.price && (
											<p className='text-red-500 text-sm'>
												{errors.price.message}
											</p>
										)}
									</div>
								</div>
								<div>
									<label
										className='block font-medium text-cap text-sm mt-4'
										htmlFor=''
									>{`Discount Percentage (%)`}</label>
									<input
										defaultValue='0'
										{...register('reduced_price')}
										type='number'
										placeholder='Type discount percentage...'
										className='bg-lightGray w-full pr-3 pl-6 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none text-sm'
									/>
									{errors.reduced_price && (
										<p className='text-red-500 text-sm'>
											{errors.reduced_price.message}
										</p>
									)}
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
										{...register('quantity', {
											required: 'Quantity is required',
											min: {value: 1, message: 'Quantity must be at least 1'}
										})}
										type='number'
										placeholder='Type product quantity here...'
										className='bg-lightGray w-full px-3 py-2 border border-gray-300 rounded-md mt-1 focus:outline-none'
									/>
									{errors.quantity && (
										<p className='text-red-500 text-sm'>
											{errors.quantity.message}
										</p>
									)}
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
								{...register('category_id', {required: 'Category is required'})}
								className='text-sm bg-lightGray w-full px-3 py-2 mt-1 border border-gray-300 rounded-md cursor-pointer focus:outline-none'
								onChange={(e) => setCateSelected(e.target.value)}
							>
								{cateSelected ?? <option>Select a category</option>}
								{categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
							{errors.category_id && (
								<p className='text-red-500 text-sm'>
									{errors.category_id.message}
								</p>
							)}
						</div>
					</div>

					{/* Product Completion */}
					<div className='flex items-center justify-between p-5 bg-white -mx-5 -mb-5 mt-5'>
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
							<button className='bg-primary text-white px-3 py-2 rounded-md flex items-center gap-1 transition hover:brightness-125'>
								<GoPlus className='text-2xl' />
								<span className='font-medium text-sm'>Add Product</span>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
