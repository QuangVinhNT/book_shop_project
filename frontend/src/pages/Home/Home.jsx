import FlashSale from '~/components/client/FlashSale/FlashSale'
import BestSeller from './BestSeller/BestSeller'
import Categories from './Categories/Categories'
import Cover from './Cover/Cover'
import Feature from './Feature/Feature'
import TopRatedBooks from './TopRatedBooks/TopRatedBooks'
import TrendingWeek from './TrendingWeek/TrendingWeek'
import Summary from '~/components/client/Summary/Summary'
import Testimonials from '~/components/client/Testimonials/Testimonials'

export default function Home() {
	return (
		<div>
			<Cover />
			<TrendingWeek />
			<Feature />
			<div className='h-screen'>
				<Categories />
				<BestSeller />
			</div>
			<TopRatedBooks />
			<div className='h-screen'>
				<FlashSale />
				<Testimonials />
			</div>
			<Summary />
		</div>
	)
}
