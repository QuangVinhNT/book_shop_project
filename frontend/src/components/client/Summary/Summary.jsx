import {PiHouseLine} from 'react-icons/pi'
import {FaRegUserCircle} from 'react-icons/fa'
import {FaStackOverflow} from 'react-icons/fa'

const summaryContents = [
	{
		icon: <PiHouseLine className='text-5xl' />,
		number: 12,
		content: 'Our stores around the world'
	},
	{
		icon: <FaRegUserCircle className='text-5xl' />,
		number: 1200,
		content: 'Our happy customer'
	},
	{
		icon: <FaStackOverflow className='text-5xl' />,
		number: 12000,
		content: 'Book Collections'
	}
]

export default function Summary() {
	return (
		<div className='h-[calc(100vh-500px)] bg-dark flex justify-center items-center gap-36 text-white'>
			{summaryContents.map((summaryContent, index) => {
				return (
					<div key={index} className='flex flex-col items-center'>
						<div className='flex items-end gap-2'>
							{summaryContent.icon}
							<span className='text-4xl font-semibold tracking-wider'>
								{summaryContent.number}
							</span>
						</div>
						<span className='font-medium inline-block mt-4'>
							{summaryContent.content}
						</span>
					</div>
				)
			})}
		</div>
	)
}
