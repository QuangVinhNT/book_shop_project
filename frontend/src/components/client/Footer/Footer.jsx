import {FiFacebook} from 'react-icons/fi'
import {PiInstagramLogoLight} from 'react-icons/pi'
import {CiTwitter} from 'react-icons/ci'
import {CiLinkedin} from 'react-icons/ci'
import {Link} from 'react-router-dom'

const quickLinks = [
	{
		name: 'About us',
		link: '#'
	},
	{
		name: 'Contact us',
		link: '#'
	},
	{
		name: 'Products',
		link: '#'
	},
	{
		name: 'Login',
		link: '#'
	},
	{
		name: 'Sign up',
		link: '#'
	}
]
const customerAreas = [
	{
		name: 'My Account',
		link: '#'
	},
	{
		name: 'Orders',
		link: '#'
	},
	{
		name: 'Tracking List',
		link: '#'
	},
	{
		name: 'Tems',
		link: '#'
	},
	{
		name: 'Privacy Policy',
		link: '#'
	},
	{
		name: 'FAQ',
		link: '#'
	}
]

export default function Footer() {
	return (
		<div className='px-[70px] pb-[146px] pt-[50px] flex justify-between gap-10'>
			{/* intro */}
			<div className='w-1/3'>
				<div className='flex items-center'>
					<img
						src='./images/luxana_book_store_logo.png'
						alt='Logo'
						className='w-[90px] p-[10px]'
					/>
					<span className='brand-font font-bold xl:text-[40px] 2xl:text-[45px] '>
						Book Luxana
					</span>
				</div>
				<p className='text-cap'>
					Book Luxana is a online bookstore website who sells all genres of book
					from around the world. Find your book here now.
				</p>
				<span className='text-xl my-7 font-medium inline-block'>Follow Us</span>
				<div className='text-2xl flex gap-4'>
					<div className='bg-white text-primary size-10 rounded-full flex justify-center items-center border border-light shadow-roundShadow shadow-gray-100 cursor-pointer transition-all hover:bg-primary hover:text-white'>
						<FiFacebook />
					</div>
					<div className='bg-white text-primary size-10 rounded-full flex justify-center items-center border border-light shadow-roundShadow shadow-gray-100 cursor-pointer transition-all hover:bg-primary hover:text-white'>
						<PiInstagramLogoLight />
					</div>
					<div className='bg-white text-primary size-10 rounded-full flex justify-center items-center border border-light shadow-roundShadow shadow-gray-100 cursor-pointer transition-all hover:bg-primary hover:text-white'>
						<CiTwitter />
					</div>
					<div className='bg-white text-primary size-10 rounded-full flex justify-center items-center border border-light shadow-roundShadow shadow-gray-100 cursor-pointer transition-all hover:bg-primary hover:text-white'>
						<CiLinkedin />
					</div>
				</div>
			</div>

			{/* links */}
			<div className='w-1/3 xl:px-8 2xl:px-16 flex justify-between'>
				<div className='w-1/2'>
					<span className='inline-block text-xl font-semibold leading-[80px]'>
						Quick Links
					</span>
					<div className='flex flex-col gap-4'>
						{quickLinks.map((value, index) => {
							return (
								<Link
									key={index}
									to={value.link}
									className='text-cap font-medium transition-all hover:text-primary hover:underline'
								>
									{value.name}
								</Link>
							)
						})}
					</div>
				</div>
				<div className='w-1/2'>
					<span className='inline-block text-xl font-semibold leading-[80px]'>
						Customer Area
					</span>
					<div className='flex flex-col gap-4'>
						{customerAreas.map((value, index) => {
							return (
								<Link
									key={index}
									to={value.link}
									className='text-cap font-medium transition-all hover:text-primary hover:underline'
								>
									{value.name}
								</Link>
							)
						})}
					</div>
				</div>
			</div>

			{/* feedback */}
			<div className='w-1/3'>
				<span className='inline-block text-xl font-semibold leading-[80px]'>{`Don't miss the latest books`}</span>
				<p className='text-cap font-medium mb-10'>
					Stay ahead of the trend with the latest releases and must-read titles.
					Explore now and find your next favourite!
				</p>
				<div>
					<input
						type='email'
						placeholder='Type your email here'
						className='bg-lightGray px-3 h-10 rounded-md text-sm focus:outline-none'
					/>
					<button className='bg-primary text-white text-sm ml-2 font-medium px-3 h-10 rounded-md brightness-100 transition-all hover:brightness-125'>
						Submit
					</button>
				</div>
			</div>
		</div>
	)
}
