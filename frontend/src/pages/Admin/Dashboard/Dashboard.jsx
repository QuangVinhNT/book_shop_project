import {MdOutlineCalendarToday} from 'react-icons/md'
import RecentOrdersTable from './RecentOrdersTable/RecentOrdersTable'
import {GoDotFill, GoPlus} from 'react-icons/go'
import {useNavigate} from 'react-router-dom'
import {FaRegMoneyBillAlt} from 'react-icons/fa'
import {FiShoppingCart} from 'react-icons/fi'
import {RiQrScan2Line} from 'react-icons/ri'
import {IoWalletOutline} from 'react-icons/io5'
import {HiDotsVertical} from 'react-icons/hi'
import {FaArrowDownLong, FaArrowUpLong} from 'react-icons/fa6'
import salesProgressChart from '~/assets/images/sales_progress.png'
import revenueSalesStatisticChart from '~/assets/images/revenue_sales_statistic.png'
import TopSellingProductTable from './TopSellingProductTable/TopSellingProductTable'

const yAxis = ['1.4k', '1.2k', '1k', '800', '600', '400', '200', '0']
const xAxis = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
]
const salesByLocations = [
	{
		location: 'United Kingdom',
		sales: 340,
		revenue: 17678,
		percent: 0.12
	},
	{
		location: 'Spain',
		sales: 100,
		revenue: 5500,
		percent: -0.05
	},
	{
		location: 'Indonesia',
		sales: 50,
		revenue: 2500,
		percent: 0
	},
	{
		location: 'France',
		sales: 147,
		revenue: 7456,
		percent: 0.19
	},
	{
		location: 'Germany',
		sales: 540,
		revenue: 24189,
		percent: -0.25
	},
	{
		location: 'United Arab Emirates',
		sales: 345,
		revenue: 15700,
		percent: 0.11
	},
	{
		location: 'Turkey',
		sales: 560,
		revenue: 24700,
		percent: -0.12
	},
	{
		location: 'United States',
		sales: 48,
		revenue: 2000,
		percent: 0.07
	},
	{
		location: 'Japan',
		sales: 23,
		revenue: 1500,
		percent: 0
	}
]

export default function Dashboard() {
	const navigate = useNavigate()
	return (
		<div className='pt-10 pb-5 px-5 bg-lightGray'>
			{/* Filter */}
			<div className='flex justify-between items-center'>
				<div className='flex bg-white border border-gray-300 p-1 gap-1 rounded-md'>
					<div className='filterActive px-4 py-1 cursor-pointer transition-all rounded-md hover:bg-lighterBlue hover:text-darkBlue'>
						<span className='font-medium text-sm'>All Time</span>
					</div>
					<div className='px-4 py-1 cursor-pointer transition-all rounded-md hover:bg-lighterBlue hover:text-darkBlue'>
						<span className='font-medium text-sm'>12 Months</span>
					</div>
					<div className='px-4 py-1 cursor-pointer transition-all rounded-md hover:bg-lighterBlue hover:text-darkBlue'>
						<span className='font-medium text-sm'>30 Days</span>
					</div>
					<div className='px-4 py-1 cursor-pointer transition-all rounded-md hover:bg-lighterBlue hover:text-darkBlue'>
						<span className='font-medium text-sm'>7 Days</span>
					</div>
					<div className='px-4 py-1 cursor-pointer transition-all rounded-md hover:bg-lighterBlue hover:text-darkBlue'>
						<span className='font-medium text-sm'>24 Hour</span>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<button className='bg-white text-cap px-3 py-2 rounded-md flex items-center gap-2 transition border border-cap hover:border-primary hover:text-primary'>
						<MdOutlineCalendarToday className='text-xl' />
						<span className='font-medium text-sm'>Select Dates</span>
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

			{/* Summary Statistics */}
			<div className='mt-5 flex gap-5'>
				<div className='bg-white p-5 w-1/4 rounded-md border border-gray-300 shadow-roundShadow shadow-black/5'>
					<div className='bg-lighterBlue/50 w-fit rounded-full p-1'>
						<FaRegMoneyBillAlt className='size-8 p-1.5 bg-lighterBlue rounded-full text-primary' />
					</div>
					<span className='block my-2 font-medium text-cap'>Total Revenue</span>
					<div className='flex items-center gap-2'>
						<span className='text-2xl font-semibold'>$75,500</span>
						<span className='text-xs text-customGreen font-semibold bg-lighterGreen px-1.5 py-0.5 rounded-full'>
							+10%
						</span>
					</div>
				</div>
				<div className='bg-white p-5 w-1/4 rounded-md border border-gray-300 shadow-roundShadow shadow-black/5'>
					<div className='bg-lighterGreen/50 w-fit rounded-full p-1'>
						<FiShoppingCart className='size-8 p-1.5 bg-lighterGreen rounded-full text-customGreen' />
					</div>
					<span className='block my-2 font-medium text-cap'>Total Sales</span>
					<div className='flex items-center gap-2'>
						<span className='text-2xl font-semibold'>31,500</span>
						<span className='text-xs text-customGreen font-semibold bg-lighterGreen px-1.5 py-0.5 rounded-full'>
							+15%
						</span>
					</div>
				</div>
				<div className='bg-white p-5 w-1/4 rounded-md border border-gray-300 shadow-roundShadow shadow-black/5'>
					<div className='bg-lighterRed/50 w-fit rounded-full p-1'>
						<RiQrScan2Line className='size-8 p-1.5 bg-lighterRed rounded-full text-customRed' />
					</div>
					<span className='block my-2 font-medium text-cap'>Product SKU</span>
					<div className='flex items-center gap-2'>
						<span className='text-2xl font-semibold'>247</span>
						<span className='text-xs text-gray-500 font-semibold bg-gray-100 px-1.5 py-0.5 rounded-full'>
							0%
						</span>
					</div>
				</div>
				<div className='bg-white p-5 w-1/4 rounded-md border border-gray-300 shadow-roundShadow shadow-black/5'>
					<div className='bg-lighterOrange/50 w-fit rounded-full p-1'>
						<IoWalletOutline className='size-8 p-1.5 bg-lighterOrange rounded-full text-customOrange' />
					</div>
					<span className='block my-2 font-medium text-cap'>Balance</span>
					<div className='flex items-center gap-2'>
						<span className='text-2xl font-semibold'>$24,500</span>
						<span className='text-xs text-customRed font-semibold bg-lighterRed px-1.5 py-0.5 rounded-full'>
							-25%
						</span>
					</div>
				</div>
			</div>

			{/* Sales Progress & Statistics chart */}
			<div className='mt-5 flex gap-5'>
				<div className='bg-white p-5 border border-gray-300 shadow-roundShadow shadow-black/5 rounded-md w-[35%]'>
					<div>
						<div className='flex justify-between items-center'>
							<span className='text-xl font-medium'>Sales Progress</span>
							<HiDotsVertical />
						</div>
						<span className='text-cap text-sm font-semibold'>This Quarter</span>
					</div>
					<div className='flex flex-col items-center relative mt-5'>
						<img src={salesProgressChart} alt='' />
						<div className='absolute top-1/2 -translate-y-1/4'>
							<span className='block text-2xl text-center font-medium'>
								75.55%
							</span>
							<span className='text-xs text-customGreen font-semibold bg-lighterGreen px-1.5 py-0.5 rounded-full block w-fit relative left-1/2 -translate-x-1/2 mt-1'>
								+10%
							</span>
						</div>
					</div>
					<p className='text-cap mt-2 text-center'>
						You succeed earn{' '}
						<span className='font-semibold text-black'>$240</span> today, its
						higher than yesterday
					</p>
					<div className='flex justify-center gap-10'>
						<div className='w-fit mt-5'>
							<span className='text-sm text-cap font-medium block text-center'>
								Target
							</span>
							<div className='flex items-center gap-1'>
								<span className='text-2xl font-semibold'>$20k</span>
								<FaArrowDownLong className='text-customRed' />
							</div>
						</div>
						<div className='w-fit mt-5'>
							<span className='text-sm text-cap font-medium block text-center'>
								Revenue
							</span>
							<div className='flex items-center gap-1'>
								<span className='text-2xl font-semibold'>$16k</span>
								<FaArrowUpLong className='text-customGreen' />
							</div>
						</div>
						<div className='w-fit mt-5'>
							<span className='text-sm text-cap font-medium block text-center'>
								Today
							</span>
							<div className='flex items-center gap-1'>
								<span className='text-2xl font-semibold'>$1.5k</span>
								<FaArrowUpLong className='text-customGreen' />
							</div>
						</div>
					</div>
				</div>
				<div className='bg-white p-5 border border-gray-300 shadow-roundShadow shadow-black/5 rounded-md w-[65%]'>
					<div className='flex items-center justify-between'>
						<div>
							<span className='block text-xl font-medium'>Statistics</span>
							<span className='text-cap text-sm font-semibold'>
								Revenue and Sales
							</span>
						</div>
						<div className='flex gap-5'>
							<div className='flex items-center'>
								<GoDotFill className='text-2xl text-primary' />
								<span className='text-cap text-sm font-medium'>Revenue</span>
							</div>
							<div className='flex items-center'>
								<GoDotFill className='text-2xl text-customOrange' />
								<span className='text-cap text-sm font-medium'>Sales</span>
							</div>
						</div>
						<HiDotsVertical />
					</div>
					<div className='flex items-center mt-5'>
						<div className='text-cap flex flex-col items-end text-xs gap-4 mr-2'>
							{yAxis.map((y, index) => {
								return <span key={index}>${y}</span>
							})}
						</div>
						<img
							src={revenueSalesStatisticChart}
							alt=''
							className='w-full border-b border-customOrange'
						/>
					</div>
					<div className='flex justify-between items-center text-xs text-cap pl-10 mt-1'>
						{xAxis.map((x, index) => {
							return <span key={index}>{x}</span>
						})}
					</div>
				</div>
			</div>
			<div className='mt-5 flex gap-5'>
				<div className='bg-white border border-gray-300 shadow-roundShadow shadow-black/5 rounded-md w-[65%]'>
					<TopSellingProductTable />
				</div>
				<div className='bg-white p-5 border border-gray-300 shadow-roundShadow shadow-black/5 rounded-md w-[35%]'>
					<div className='flex justify-between items-center mb-5'>
						<div>
							<span className='block text-xl font-medium'>
								Sales by Location
							</span>
							<span className='block text-cap text-sm font-semibold'>
								Sales performance by location
							</span>
						</div>
						<HiDotsVertical />
					</div>
					<div>
						{salesByLocations.map((salesByLocation, index) => {
							return (
								<div
									key={index}
									className='flex justify-between items-center mb-2'
								>
									<div>
										<span className='block font-medium'>
											{salesByLocation.location}
										</span>
										<span className='block text-sm text-cap'>
											{salesByLocation.sales} Sales
										</span>
									</div>
									<div className='flex gap-2'>
										<span className='font-medium'>
											${salesByLocation.revenue}
										</span>
										<span
											className={`${
												salesByLocation.percent > 0
													? 'text-customGreen bg-lighterGreen'
													: salesByLocation.percent < 0
													? 'text-customRed bg-lighterRed'
													: 'text-gray-500 bg-gray-500/10'
											} text-xs font-semibold py-1 px-2 rounded-full`}
										>
											{salesByLocation.percent > 0 && '+'}
											{(salesByLocation.percent * 100).toFixed(0)}%
										</span>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
			<div className='bg-white border border-gray-300 shadow-roundShadow shadow-black/5 rounded-md my-5'>
				<RecentOrdersTable />
			</div>
		</div>
	)
}
