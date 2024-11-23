import {FaBars} from 'react-icons/fa6'
import {IoSearch} from 'react-icons/io5'
import {MdOutlineCalendarToday} from 'react-icons/md'
import {FaRegBell} from 'react-icons/fa'
import {FaRegEnvelope} from 'react-icons/fa'
import {FaAngleDown} from 'react-icons/fa6'
export default function Header() {
	return (
		<div className='flex justify-between items-center px-5 h-[60px]'>
			<FaBars className='text-xl text-cap hover:text-primary transition-all cursor-pointer' />
			<div className='flex h-full'>
				<div className='flex items-center text-2xl gap-10 pr-6 text-cap'>
					<IoSearch className='hover:text-primary transition-all cursor-pointer' />
					<MdOutlineCalendarToday className='hover:text-primary transition-all cursor-pointer' />
					<div className='relative'>
						<FaRegBell className='hover:text-primary transition-all cursor-pointer' />
						<div className='absolute -top-1 -right-1 size-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px]'>
							<span>30</span>
						</div>
					</div>
					<div className='relative'>
						<FaRegEnvelope className='hover:text-primary transition-all cursor-pointer' />
						<div className='absolute -top-1 -right-1 size-4 bg-red-500 text-white rounded-full flex items-center justify-center text-[8px]'>
							<span>30</span>
						</div>
					</div>
				</div>
				<div className='flex items-center gap-3 px-3 ml-3 -mr-3 transition-all hover:bg-gray-300 cursor-pointer rounded-xl'>
					<div className='relative'>
						<img
							src='./vite.svg'
							alt=''
							className='size-8 rounded-full bg-gray-300'
						/>
						<div className='absolute -right-1 -bottom-0.5 size-3 bg-green-500 rounded-full border-2 border-white'></div>
					</div>
					<div className='flex flex-col'>
						<span className='text-sm font-semibold'>Jay Hargudson</span>
						<span className='text-xs font-medium text-cap'>Manager</span>
					</div>
					<FaAngleDown className='text-cap' />
				</div>
			</div>
		</div>
	)
}
