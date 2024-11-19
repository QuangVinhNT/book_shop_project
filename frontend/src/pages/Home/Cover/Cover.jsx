import {FaArrowRight} from 'react-icons/fa'

import coverImage from '~/assets/images/cover_image.png'

export default function Cover() {
	return (
		<div className='h-[calc(100vh-110px)] w-full flex'>
			<div className='relative w-1/2 h-full pl-[70px] bg-dark text-white'>
				<h1 className='mt-[80px] mb-8 text-6xl font-semibold leading-tight xl:w-full 2xl:w-4/5 text-center'>
					Welcome to Luxana Online Book Store
				</h1>
				<p className='text-xl font-light xl:w-full 2xl:w-3/4'>
					Welcome to our treasure trove of books. Start right away to have the
					best experiences. There are many exciting things waiting for you to
					discover in Book Luxana.
				</p>
				<button className='relative p-4 rounded-md top-1/4 flex items-center justify-between gap-6 bg-customOrange transition-all hover:brightness-125'>
					<span>Go to Collections</span>
					<FaArrowRight />
				</button>
				<div className='coverClipPath absolute right-0 top-0 translate-x-full z-10 w-[100px] h-full bg-dark'></div>
			</div>
			<div className='h-full w-1/2 -z-10 top-0 right-0'>
				<img src={coverImage} alt='Cover img' className='h-full object-cover' />
			</div>
		</div>
	)
}
