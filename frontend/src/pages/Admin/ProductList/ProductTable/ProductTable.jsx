import {useState} from 'react'
import {FaAngleDown} from 'react-icons/fa'
import {FaAngleUp} from 'react-icons/fa'
import {FaEye} from 'react-icons/fa'
import {LuPencil} from 'react-icons/lu'
import {FaRegTrashAlt} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {environment} from '~/utils/environment'
import ProductDeletion from '../ProductDeletion/ProductDeletion'

export default function ProductTable({products, getProducts, setCurrentPage}) {
	const [show, setShow] = useState()
	const [deletableProd, setDeletableProd] = useState(null)
	const navigate = useNavigate()

	// True: asc, False: desc
	const [sortingProduct, setSortingProduct] = useState(true)
	const [sortingPrice, setSortingPrice] = useState(true)
	const [sortingDate, setSortingDate] = useState(true)

	const handleDeleteProduct = async () => {
		const toastId = toast.loading('Please wait...')
		try {
			const response = await fetch(
				`${environment.BACKEND_URL}/delete-product/${deletableProd.id}`,
				{
					method: 'DELETE',
					credentials: 'include'
				}
			)

			const data = await response.json()

			if (response.ok) {
				setCurrentPage(1)
				getProducts()
				toast.update(toastId, {
					render: data.message || 'Xoa success',
					type: 'success',
					isLoading: false,
					autoClose: 3000
				})
			} else {
				toast.update(toastId, {
					render: data.message || 'Xoa Error',
					type: 'error',
					isLoading: false,
					autoClose: 3000
				})
			}
		} catch (error) {
			toast.update(toastId, {
				render: 'Internal server error',
				type: 'error',
				isLoading: false,
				autoClose: 3000
			})
		} finally {
			setShow(false)
			setDeletableProd(null)
		}
	}

	return (
		<>
			<table className='w-full mt-5 border-spacing-0 border-separate rounded-t-xl border-2 shadow-roundShadow shadow-gray-200 overflow-hidden'>
				<thead>
					<tr className='text-[15px]'>
						<th className='p-4 border-gray-500 rounded-xl text-left'>
							<div className='flex items-center'>
								<input type='checkbox' className='size-5 cursor-pointer' />
							</div>
						</th>
						<th
							className='pl-2 text-left cursor-pointer'
							onClick={() => setSortingProduct(!sortingProduct)}
						>
							<div className='flex items-center gap-5 font-medium text-cap'>
								<span>Product</span>
								{sortingProduct ? <FaAngleDown /> : <FaAngleUp />}
							</div>
						</th>
						<th className='pl-2 font-medium text-cap text-left'>Publisher</th>
						<th className='pl-2 font-medium text-cap text-left'>Category</th>
						<th className='pl-2'>
							<div className='flex items-center gap-5 font-medium text-cap'>
								<span>Price</span>
								{sortingPrice ? <FaAngleDown /> : <FaAngleUp />}
							</div>
						</th>
						<th className='pl-2 font-medium text-cap text-left'>Author</th>
						<th className='pl-2 text-left'>
							<div className='flex items-center gap-5 font-medium text-cap'>
								<span>Added</span>
								{sortingDate ? <FaAngleDown /> : <FaAngleUp />}
							</div>
						</th>
						<th className='pl-2 font-medium text-cap text-left'>Action</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product, index) => {
						return (
							<tr key={index} className='text-[15px] bg-white'>
								<td className='flex items-center p-4 border-t border-gray-300'>
									<div>
										<input type='checkbox' className='size-5 cursor-pointer' />
									</div>
								</td>
								<td className='pl-2 border-t border-gray-300'>
									{product.name}
								</td>
								<td className='pl-2 border-t border-gray-300'>
									{product.publisher}
								</td>
								<td className='pl-2 border-t border-gray-300'>
									{product.category.name}
								</td>
								<td className='pl-2 border-t border-gray-300'>
									${product.price.toFixed(2)}
								</td>
								<td className='pl-2 border-t border-gray-300'>
									{product.author}
								</td>
								<td className='pl-2 border-t border-gray-300'>
									{new Date(product.created_at).toLocaleString('vi-VN', {
										timeZone: 'Asia/Ho_Chi_Minh'
									})}
								</td>
								<td className='border-t border-gray-300 pl-2'>
									<div className='flex items-center gap-3 text-lg'>
										<FaEye
											onClick={() =>
												navigate(`/admin/view-product/${product.id}`)
											}
											className='text-xl cursor-pointer transition-all hover:text-blue-500'
										/>
										<LuPencil
											onClick={() =>
												navigate(`/admin/edit-product/${product.id}`)
											}
											className='cursor-pointer transition-all hover:text-star'
										/>
										<FaRegTrashAlt
											onClick={() => {
												setShow(true)
												setDeletableProd(product)
											}}
											className='cursor-pointer transition-all hover:text-red-500'
										/>
									</div>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<ProductDeletion
				show={show}
				setShow={setShow}
				deletableProd={deletableProd}
				handleDeleteProduct={handleDeleteProduct}
			/>
		</>
	)
}
