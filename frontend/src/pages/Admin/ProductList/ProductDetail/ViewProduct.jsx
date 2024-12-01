import {useEffect, useState} from 'react'
import {FaArrowLeftLong} from 'react-icons/fa6'
import {Link, useParams} from 'react-router-dom'
import Loading from '~/components/notification/Loading/Loading'
import {environment} from '~/utils/environment'
import {categories} from '~/utils/util'

import book1 from '~/assets/images/book_1.png'

function ViewProduct() {
	const [product, setProduct] = useState(null)
	const {id} = useParams()

	const getProduct = async () => {
		const response = await fetch(`${environment.BACKEND_URL}/product/${id}`)
		const data = await response.json()

		if (response.ok) {
			setProduct(data.product)
		} else {
			setProduct(null)
		}
	}

	useEffect(() => {
		getProduct()
	}, [])

	if (!product) {
		return (
			<div className='h-screen relative'>
				<Loading />
			</div>
		)
	}

	return (
		<div className='p-8 bg-gray-100'>
			<Link to={'/admin/products'}>
				<div className='flex items-center gap-3 mb-2 hover:text-primary w-fit cursor-pointer transition-all'>
					<FaArrowLeftLong />
					<span className='text-lg font-medium'>Back</span>
				</div>
			</Link>
			<h1 className='text-3xl font-bold text-gray-800 mb-4 bg-white rounded-lg p-6'>
				{product.name}
			</h1>
			<div className='mx-auto bg-white rounded-lg overflow-hidden p-6 mb-4'>
				{/* Product Details */}
				<div className='p-5 flex gap-10'>
					<div className='w-1/2 flex flex-col gap-2'>
						<p className='text-lg text-gray-700 '>
							<strong className='inline-block w-[170px]'>Category</strong>{' '}
							{categories.find((cate) => cate.id == product.category_id).name}
						</p>
						<p className='text-lg text-gray-700 '>
							<strong className='inline-block w-[170px]'>Price</strong> $
							{product.price}
						</p>
						<p className='text-lg text-gray-700 '>
							<strong className='inline-block w-[170px]'>Reduced Price</strong>{' '}
							${product.reduced_price}
						</p>
						<p className='text-lg text-gray-700 '>
							<strong className='inline-block w-[170px]'>Quantity</strong>{' '}
							{product.quantity}
						</p>
						<p className='text-lg text-gray-700 '>
							<strong className='inline-block w-[170px]'>Author</strong>{' '}
							{product.author}
						</p>
						<p className='text-lg text-gray-700 '>
							<strong className='inline-block w-[170px]'>Language</strong>{' '}
							{product.language}
						</p>
					</div>
					<div className='w-1/2 flex flex-col gap-2'>
						<p className='text-lg text-gray-700 '>
							<strong className='inline-block w-[170px]'>Format</strong>{' '}
							{product.format}
						</p>
						<p className='text-lg text-gray-700 '>
							<strong className='inline-block w-[170px]'>Published Date</strong>{' '}
							{new Date(product.date_published).toLocaleDateString()}
						</p>
						<p className='text-lg text-gray-700 '>
							<strong className='inline-block w-[170px]'>Publisher</strong>{' '}
							{product.publisher}
						</p>
						<p className='text-lg text-gray-700 '>
							<strong className='inline-block w-[170px]'>Created At</strong>{' '}
							{new Date(product.created_at).toLocaleString()}
						</p>
						<p className='text-lg text-gray-700 '>
							<strong className='inline-block w-[170px]'>Updated At</strong>{' '}
							{new Date(product.updated_at).toLocaleString()}
						</p>
					</div>
				</div>
			</div>

			{/* Product Description */}
			<div className='mx-auto bg-white rounded-lg overflow-hidden p-6 mb-4'>
				<h2 className='text-2xl font-semibold text-gray-800'>Description</h2>
				<p className='text-gray-600 mt-2'>{product.description}</p>
			</div>

			{/* Product Images */}
			<div className='mx-auto bg-white rounded-lg overflow-hidden p-6'>
				<h2 className='text-2xl font-semibold text-gray-800'>Product Images</h2>
				<div className='gap-4 mt-2'>
					{product.image.map((img) => (
						<div key={img.id} className='overflow-hidden rounded-lg'>
							<img
								src={img.image_name}
								// src={book1}
								alt={`Image ${img.id}`}
								className='object-cover w-[150px] h-[200px] rounded-lg border-gray-200'
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ViewProduct
