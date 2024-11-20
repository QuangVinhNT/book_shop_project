import FeaturedWeb from '~/components/client/FeaturedWeb/FeaturedWeb'
import FeaturedBook from './FeaturedBook/FeaturedBook'

export default function Feature() {
	return (
		<div className='h-screen overflow-hidden'>
			<FeaturedWeb />
			<FeaturedBook />
		</div>
	)
}
