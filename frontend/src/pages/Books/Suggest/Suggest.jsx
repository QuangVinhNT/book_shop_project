import FeaturedWeb from '~/components/client/FeaturedWeb/FeaturedWeb'
import SuggestBooks from './SuggestBooks/SuggestBooks'

export default function Suggest() {
	return (
		<div>
			<div className='mb-10'>
				<h1 className='text-3xl font-semibold pl-20 my-10'>Make you like it</h1>
				<SuggestBooks />
			</div>
			<FeaturedWeb />
		</div>
	)
}
