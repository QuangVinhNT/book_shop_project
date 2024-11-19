import FeaturedBook from './FeaturedBook/FeaturedBook'
import FeaturedWeb from './FeaturedWeb/FeaturedWeb'

export default function Feature() {
	return (
		<div className='h-screen overflow-hidden'>
			<FeaturedWeb />
			<FeaturedBook />
		</div>
	)
}
