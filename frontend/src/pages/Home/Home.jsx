import BestSeller from './BestSeller/BestSeller'
import Categories from './Categories/Categories'
import Cover from './Cover/Cover'
import Feature from './Feature/Feature'
import FlashSale from './FlashSale/FlashSale'
import Summary from './Summary/Summary'
import Testimonials from './Testimonials/Testimonials'
import TopRatedBooks from './TopRatedBooks/TopRatedBooks'
import TrendingWeek from './TrendingWeek/TrendingWeek'

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
