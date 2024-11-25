import {useState} from 'react'
import {FaAngleDown} from 'react-icons/fa'
import {FaAngleUp} from 'react-icons/fa'
import {FaEye} from 'react-icons/fa'
import {LuPencil} from 'react-icons/lu'
import {FaRegTrashAlt} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {environment} from '~/utils/environment'

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
			<table className='w-full mt-5 border-spacing-0 border-separate rounded-xl border-2 shadow-roundShadow shadow-gray-200 overflow-hidden'>
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
								<td>
									<div className='flex items-center p-4'>
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

			<div
				className={`${
					show ? 'show' : 'hidden'
				} overflow-y-auto overflow-x-hidden fixed top-0 bg-black/20 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}
			>
				<div className='relative p-4 w-full max-w-md h-full md:h-auto'>
					<div className='relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
						<button
							onClick={() => setShow(false)}
							type='button'
							className='text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
							data-modal-toggle='deleteModal'
						>
							<svg
								aria-hidden='true'
								className='w-5 h-5'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
									clipRule='evenodd'
								></path>
							</svg>
							<span className='sr-only'>Close modal</span>
						</button>
						<svg
							className='text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto'
							aria-hidden='true'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
								clipRule='evenodd'
							></path>
						</svg>
						<p className='mb-4 text-gray-500 dark:text-gray-300'>
							Are you sure you want to delete this item{' '}
							<span className='font-bold'>{deletableProd?.name}</span> ?
						</p>
						<div className='flex justify-center items-center space-x-4'>
							<button
								onClick={() => setShow(false)}
								data-modal-toggle='deleteModal'
								type='button'
								className='py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
							>
								No, cancel
							</button>
							<button
								onClick={handleDeleteProduct}
								type='submit'
								className='py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900'
							>
								Yes, sure
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
