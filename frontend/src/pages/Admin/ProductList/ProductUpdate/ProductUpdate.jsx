import {useForm} from 'react-hook-form'
import {categories} from '~/utils/util'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination, Grid} from 'swiper/modules'
import {useState} from 'react'
import {environment} from '~/utils/environment'
import {toast} from 'react-toastify'
import {Link, useParams} from 'react-router-dom'

import 'swiper/css/navigation'
import 'swiper/css/pagination'
import {LiaTimesSolid} from 'react-icons/lia'
import {GrUpdate} from 'react-icons/gr'
import {FaTimes, FaTimesCircle} from 'react-icons/fa'

function ProductUpdate() {
	const [loading, setLoading] = useState(true)
	const param = useParams()

	const [deleteImageIds, setDeleteImageIds] = useState([])
	const [oldProdImages, setOldProdImages] = useState([])
	const [newProdImages, setProdImages] = useState([])
	const [previewProdImages, setPreviewProdImages] = useState([])

	const {
		register,
		handleSubmit,
		formState: {errors},
		reset
	} = useForm({
		defaultValues: async () => {
			const response = await fetch(
				`${environment.BACKEND_URL}/product/${param.id}`
			)
			const data = await response.json()
			setLoading(false)
			setOldProdImages(data.product.image)
			return data.product
		},
		mode: 'onTouched'
	})

	const handleUploadProdImages = (e) => {
		const fileList = Array.from(e.target.files)
		const previewImages = fileList.reduce((result, file) => {
			const tempUrl = URL.createObjectURL(file)
			return [...result, tempUrl]
		}, [])

		setProdImages((prevImages) => [...prevImages, ...fileList])
		setPreviewProdImages((prevPreviews) => [...prevPreviews, ...previewImages])
	}

	const onSubmit = async (data) => {
		if (oldProdImages.length === 0 && newProdImages.length === 0) return
		const toastId = toast.loading('Please wait...')
		try {
			const {images, image, ...productInfo} = data

			const responseUpdatedProduct = await fetch(
				`${environment.BACKEND_URL}/update-product/${param.id}`,
				{
					method: 'PUT',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						productUpdated: {...productInfo},
						deleteImageIds
					})
				}
			)

			if (responseUpdatedProduct.ok) {
				const dataUpdatedProduct = await responseUpdatedProduct.json()

				if (newProdImages.length !== 0) {
					const imageDatas = new FormData()
					// Array.from(images).forEach((image) => {
					//   imageDatas.append(`images[]`, image);
					// });
					newProdImages.forEach((image) => {
						imageDatas.append(`images[]`, image)
					})
					imageDatas.append('product_id', dataUpdatedProduct.product.id)

					const responseImages = await fetch(
						`${environment.BACKEND_URL}/uploads-with-product-id`,
						{
							method: 'POST',
							body: imageDatas,
							credentials: 'include'
						}
					)

					if (responseImages.ok) {
						const productData = await responseImages.json()
						setOldProdImages(productData.product.image)
						setPreviewProdImages([])
						setDeleteImageIds([])
						setProdImages([])
						toast.update(toastId, {
							render: 'Update product success',
							type: 'success',
							isLoading: false,
							autoClose: 3000
						})
					} else {
						toast.update(toastId, {
							render: 'Update product failed',
							type: 'error',
							isLoading: false,
							autoClose: 3000
						})
					}
				} else {
					setDeleteImageIds([])
					setOldProdImages(dataUpdatedProduct.product.image)
					toast.update(toastId, {
						render: data.message || 'Update product success',
						type: 'success',
						isLoading: false,
						autoClose: 3000
					})
				}
			} else {
				toast.update(toastId, {
					render: data.message || 'Update product failed',
					type: 'error',
					isLoading: false,
					autoClose: 3000
				})
			}
		} catch (error) {
			toast.update(toastId, {
				render: 'Internal server error.',
				type: 'error',
				isLoading: false,
				autoClose: 3000
			})
		}
	}

	if (loading) {
		return (
			<div className='flex items-center text-3xl justify-center h-screen text-blue-500'>
				Get product {param.id}
			</div>
		)
	}

	return (
		<div className='mx-auto pt-10 pb-5 px-5 bg-lightGray rounded-lg'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='bg-white px-5 py-6 rounded-lg border-2 border-gray-300'
			>
				<div className='flex items-center justify-between'>
					<h3 className='text-2xl font-medium mb-4 text-ca'>
						Edit Product #{param.id}
					</h3>
					{/* Update Button */}
					<div className='flex items-center gap-2'>
						<Link to={'/admin/products'}>
							<button className=' text-cap px-4 py-2 rounded-md flex items-center gap-2 transition border border-cap hover:border-red-500 hover:text-red-500'>
								<LiaTimesSolid className='text-xl' />
								<span className='font-medium text-sm'>Cancel</span>
							</button>
						</Link>
						<div className=''>
							<button
								type='submit'
								className='w-full px-4 py-2 bg-primary text-white rounded-md hover:brightness-125 transition-all flex items-center gap-2'
							>
								<GrUpdate />
								<span>Update</span>
							</button>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 '>
					{/* Name */}
					<div>
						<label className='block text-sm font-medium text-cap'>Name</label>
						<input
							{...register('name', {
								required: 'Name is required',
								minLength: {
									value: 3,
									message: 'Name must be at least 3 characters long'
								}
							})}
							type='text'
							className='w-full px-3 py-2 border border-gray-300 bg-lightGray rounded-lg focus:outline-none mt-1'
						/>
						{errors.name && (
							<p className='text-red-500 text-sm'>{errors.name.message}</p>
						)}
					</div>

					{/* Category ID */}
					<div>
						<label className='block text-sm font-medium text-cap'>
							Category
						</label>
						<select
							{...register('category_id', {required: 'Category is required'})}
							className='w-full px-3 py-2 border border-gray-300 bg-lightGray rounded-lg focus:outline-none mt-1'
						>
							<option value=''>Select a category</option>
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

					{/* Price */}
					<div>
						<label className='block text-sm font-medium text-cap'>Price</label>
						<input
							{...register('price', {
								required: 'Price is required',
								min: {value: 0.01, message: 'Price must be greater than 0'}
							})}
							type='number'
							step='0.01'
							className='w-full px-3 py-2 border border-gray-300 bg-lightGray rounded-lg focus:outline-none mt-1'
						/>
						{errors.price && (
							<p className='text-red-500 text-sm'>{errors.price.message}</p>
						)}
					</div>

					{/* Reduced Price */}
					<div>
						<label className='block text-sm font-medium text-cap'>
							Reduced Price
						</label>
						<input
							defaultValue='0'
							{...register('reduced_price')}
							type='number'
							step='0.01'
							className='w-full px-3 py-2 border border-gray-300 bg-lightGray rounded-lg focus:outline-none mt-1'
						/>
						{errors.reduced_price && (
							<p className='text-red-500 text-sm'>
								{errors.reduced_price.message}
							</p>
						)}
					</div>

					{/* Quantity */}
					<div>
						<label className='block text-sm font-medium text-cap'>
							Quantity
						</label>
						<input
							{...register('quantity', {
								required: 'Quantity is required',
								min: {value: 1, message: 'Quantity must be at least 1'}
							})}
							type='number'
							className='w-full px-3 py-2 border border-gray-300 bg-lightGray rounded-lg focus:outline-none mt-1'
						/>
						{errors.quantity && (
							<p className='text-red-500 text-sm'>{errors.quantity.message}</p>
						)}
					</div>

					{/* Author */}
					<div>
						<label className='block text-sm font-medium text-cap'>Author</label>
						<input
							{...register('author', {
								required: 'Author is required',
								minLength: {
									value: 3,
									message: 'Author name must be at least 3 characters long'
								}
							})}
							type='text'
							className='w-full px-3 py-2 border border-gray-300 bg-lightGray rounded-lg focus:outline-none mt-1'
						/>
						{errors.author && (
							<p className='text-red-500 text-sm'>{errors.author.message}</p>
						)}
					</div>

					{/* Language */}
					<div>
						<label className='block text-sm font-medium text-cap'>
							Language
						</label>
						<input
							{...register('language', {required: 'Language is required'})}
							type='text'
							className='w-full px-3 py-2 border border-gray-300 bg-lightGray rounded-lg focus:outline-none mt-1'
						/>
						{errors.language && (
							<p className='text-red-500 text-sm'>{errors.language.message}</p>
						)}
					</div>

					{/* Format */}
					<div>
						<label className='block text-sm font-medium text-cap'>Format</label>
						<input
							{...register('format', {required: 'Format is required'})}
							type='text'
							className='w-full px-3 py-2 border border-gray-300 bg-lightGray rounded-lg focus:outline-none mt-1'
						/>
						{errors.format && (
							<p className='text-red-500 text-sm'>{errors.format.message}</p>
						)}
					</div>

					{/* Date Published */}
					<div>
						<label className='block text-sm font-medium text-cap'>
							Date Published
						</label>
						<input
							{...register('date_published', {
								required: 'Date published is required'
							})}
							type='date'
							className='w-full px-3 py-2 border border-gray-300 bg-lightGray rounded-lg focus:outline-none mt-1'
						/>
						{errors.date_published && (
							<p className='text-red-500 text-sm'>
								{errors.date_published.message}
							</p>
						)}
					</div>

					{/* Publisher */}
					<div>
						<label className='block text-sm font-medium text-cap'>
							Publisher
						</label>
						<input
							{...register('publisher', {
								required: 'Publisher is required',
								minLength: {
									value: 3,
									message: 'Publisher name must be at least 3 characters long'
								}
							})}
							type='text'
							className='w-full px-3 py-2 border border-gray-300 bg-lightGray rounded-lg focus:outline-none mt-1'
						/>
						{errors.publisher && (
							<p className='text-red-500 text-sm'>{errors.publisher.message}</p>
						)}
					</div>

					{/* Description */}
					<div className='md:col-span-2'>
						<label className='block text-sm font-medium text-cap'>
							Description
						</label>
						<textarea
							{...register('description', {
								required: 'Description is required'
							})}
							className='w-full h-[150px] px-3 py-2 border border-gray-300 bg-lightGray rounded-lg focus:outline-none mt-1'
						></textarea>
						{errors.description && (
							<p className='text-red-500 text-sm'>
								{errors.description.message}
							</p>
						)}
					</div>

					<div className='md:col-span-2'>
						<div className='border-2 border-dashed border-gray-300 rounded-md p-5'>
							<div>
								<label
									className='block text-primary bg-light w-fit px-4 py-2 rounded-md transition-all cursor-pointer hover:bg-primary hover:text-white mx-auto'
									htmlFor='multiple_files'
								>
									Add Images
								</label>
								<input
									hidden
									{...register('images')}
									onChange={(e) => handleUploadProdImages(e)}
									id='multiple_files'
									type='file'
									multiple
								/>
								{oldProdImages.length === 0 && newProdImages.length === 0 && (
									<p className='text-red-500 text-sm text-center'>
										Require at least one image
									</p>
								)}
							</div>
							<div className='mt-5'>
								<Swiper
									slidesPerView={5}
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
									{oldProdImages &&
										oldProdImages.map((prodImg, index) => (
											<SwiperSlide key={index}>
												<div className='w-[150px] h-[220px] flex items-center flex-col justify-center p-4 relative'>
													<img
														src={prodImg.image_name}
														className='w-full h-full object-cover pb-5'
													/>
													<button
														type='button'
														onClick={() => {
															setDeleteImageIds((prev) => [...prev, prodImg.id])
															setOldProdImages((prevImages) =>
																prevImages.filter((_, i) => i !== index)
															)
														}}
													>
														<FaTimes className='text-red-500 bg-white size-5 p-1 absolute right-7 top-7 opacity-70 hover:text-white hover:opacity-100 hover:bg-red-500 transition-all rounded-full' />
													</button>
												</div>
											</SwiperSlide>
										))}
									{previewProdImages &&
										previewProdImages.map((tempUrl, index) => (
											<SwiperSlide key={index}>
												<div className='w-[150px] h-[220px] flex items-center flex-col justify-center p-4 relative'>
													<img
														src={tempUrl}
														className='w-full h-full object-cover pb-5'
													/>
													<button
														type='button'
														onClick={() => {
															setPreviewProdImages((prevPreviews) =>
																prevPreviews.filter((_, i) => i !== index)
															)
															setProdImages((prevImages) =>
																prevImages.filter((_, i) => i !== index)
															)
														}}
													>
														<FaTimes className='text-red-500 bg-white size-5 p-1 absolute right-7 top-7 opacity-70 hover:text-white hover:opacity-100 hover:bg-red-500 transition-all rounded-full' />
													</button>
												</div>
											</SwiperSlide>
										))}
								</Swiper>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default ProductUpdate
