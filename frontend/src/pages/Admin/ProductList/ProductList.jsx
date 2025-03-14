import {GoPlus} from 'react-icons/go'
import ProductTable from './ProductTable/ProductTable'
import {PiExportBold} from 'react-icons/pi'
import {IoSearch} from 'react-icons/io5'
import {MdOutlineCalendarToday} from 'react-icons/md'
import {IoMdOptions} from 'react-icons/io'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {environment} from '~/utils/environment'
import {toast} from 'react-toastify'
import ReactPaginate from 'react-paginate'

// const products = [
// 	{
// 		name: 'Alev Sacli Cocuk',
// 		publisher: 'Greenwillow Books',
// 		category: 'Literature & Fiction',
// 		price: 121,
// 		author: 'Christine Nostlinger',
// 		addedDate: '29 Dec 2022'
// 	},
// 	{
// 		name: 'Alev Sacli Cocuk',
// 		publisher: 'Greenwillow Books',
// 		category: 'Literature & Fiction',
// 		price: 121,
// 		author: 'Christine Nostlinger',
// 		addedDate: '29 Dec 2022'
// 	},
// 	{
// 		name: 'Alev Sacli Cocuk',
// 		publisher: 'Greenwillow Books',
// 		category: 'Literature & Fiction',
// 		price: 121,
// 		author: 'Christine Nostlinger',
// 		addedDate: '29 Dec 2022'
// 	},
// 	{
// 		name: 'Alev Sacli Cocuk',
// 		publisher: 'Greenwillow Books',
// 		category: 'Literature & Fiction',
// 		price: 121,
// 		author: 'Christine Nostlinger',
// 		addedDate: '29 Dec 2022'
// 	},
// 	{
// 		name: 'Alev Sacli Cocuk',
// 		publisher: 'Greenwillow Books',
// 		category: 'Literature & Fiction',
// 		price: 121,
// 		author: 'Christine Nostlinger',
// 		addedDate: '29 Dec 2022'
// 	},
// 	{
// 		name: 'Alev Sacli Cocuk',
// 		publisher: 'Greenwillow Books',
// 		category: 'Literature & Fiction',
// 		price: 121,
// 		author: 'Christine Nostlinger',
// 		addedDate: '29 Dec 2022'
// 	},
// 	{
// 		name: 'Alev Sacli Cocuk',
// 		publisher: 'Greenwillow Books',
// 		category: 'Literature & Fiction',
// 		price: 121,
// 		author: 'Christine Nostlinger',
// 		addedDate: '29 Dec 2022'
// 	},
// 	{
// 		name: 'Alev Sacli Cocuk',
// 		publisher: 'Greenwillow Books',
// 		category: 'Literature & Fiction',
// 		price: 121,
// 		author: 'Christine Nostlinger',
// 		addedDate: '29 Dec 2022'
// 	},
// 	{
// 		name: 'Alev Sacli Cocuk',
// 		publisher: 'Greenwillow Books',
// 		category: 'Literature & Fiction',
// 		price: 121,
// 		author: 'Christine Nostlinger',
// 		addedDate: '29 Dec 2022'
// 	},
// 	{
// 		name: 'Alev Sacli Cocuk',
// 		publisher: 'Greenwillow Books',
// 		category: 'Literature & Fiction',
// 		price: 121,
// 		author: 'Christine Nostlinger',
// 		addedDate: '29 Dec 2022'
// 	}
// ]

export default function ProductList() {
	const [products, setProducts] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage] = useState(1)
	const [pageCount, setPageCount] = useState(0)

	const getProducts = async () => {
		const toastId = toast.loading('Loading products....')
		try {
			const response = await fetch(
				`${environment.BACKEND_URL}/products?page=${currentPage}&per_page=${itemsPerPage}`,
				{
					method: 'GET',
					credentials: 'include'
				}
			)
			const data = await response.json()
			if (response.ok) {
				setProducts(data.products.data)
				setPageCount(data.products.last_page)
				toast.update(toastId, {
					render: data.message || 'Load product success.',
					type: 'success',
					isLoading: false,
					autoClose: 1000
				})
			} else {
				toast.update(toastId, {
					render: data.message || 'Load product failed.',
					type: 'error',
					isLoading: false,
					autoClose: 1000
				})
			}
		} catch (err) {
			toast.update(toastId, {
				render: 'Internal server error',
				type: 'error',
				isLoading: false,
				autoClose: 1000
			})
		}
	}

	useEffect(() => {
		getProducts()
	}, [currentPage])

	const handlePageClick = (event) => {
		setCurrentPage(event.selected + 1)
	}

	const navigate = useNavigate()
	return (
		<div className='pt-10 pb-5 px-5 bg-lightGray'>
			<div className='flex items-center justify-between mb-5'>
				<span className='text-2xl font-medium text-cap'>Product</span>
				<div className='flex items-center gap-3'>
					<button className='bg-light text-primary px-3 py-2 rounded-md flex items-center gap-2 transition border-2 border-transparent hover:border-primary'>
						<PiExportBold className='text-xl' />
						<span className='font-medium text-sm'>Export</span>
					</button>
					<button
						onClick={() => navigate('/admin/add-product')}
						className='bg-primary text-white px-3 py-2 rounded-md flex items-center gap-1 transition hover:brightness-125'
					>
						<GoPlus className='text-2xl' />
						<span className='font-medium text-sm'>Add Product</span>
					</button>
				</div>
			</div>
			<div className='flex items-center justify-between'>
				<div className='flex items-center bg-white px-2 py-2 gap-2 rounded-lg border border-gray-300'>
					<IoSearch className='text-cap text-xl' />
					<input
						type='text'
						placeholder='Search product...'
						className='bg-transparent text-sm w-[250px]'
					/>
				</div>
				<div className='flex items-center gap-5'>
					<button className='bg-white text-cap px-3 py-2 rounded-md flex items-center gap-2 transition border border-cap hover:border-primary hover:text-primary'>
						<MdOutlineCalendarToday className='text-xl' />
						<span className='font-medium text-sm'>Select Dates</span>
					</button>
					<button className='bg-white text-cap px-3 py-2 rounded-md flex items-center gap-2 transition border border-cap hover:border-primary hover:text-primary'>
						<IoMdOptions className='text-xl' />
						<span className='font-medium text-sm'>Filter</span>
					</button>
				</div>
			</div>
			<ProductTable
				setCurrentPage={setCurrentPage}
				getProducts={getProducts}
				products={products}
			/>

			<div className='text-[15px] py-5 bg-white border-x-2 border-b-2 rounded-b-xl border-gray-200'>
				<ReactPaginate
					previousLabel={'<'}
					nextLabel={'>'}
					breakLabel={'...'}
					pageCount={pageCount}
					marginPagesDisplayed={2}
					pageRangeDisplayed={3}
					forcePage={currentPage - 1}
					onPageChange={handlePageClick}
					containerClassName={'flex justify-center items-center gap-2'}
					pageClassName={
						'bg-light text-primary hover:bg-primary hover:text-white rounded-md flex'
					}
					pageLinkClassName={
						'text-xs font-semibold inline-block text-center leading-8 size-8 cursor-pointer transition-all'
					}
					previousClassName={
						'size-8 text-center text-primary bg-light text-xs p-2 rounded-md cursor-pointer transition-all hover:bg-primary hover:text-white'
					}
					nextClassName={
						'size-8 text-center text-primary bg-light text-xs p-2 rounded-md cursor-pointer transition-all hover:bg-primary hover:text-white'
					}
					activeClassName={'bg-primary text-white'}
				/>
			</div>
		</div>
	)
}
