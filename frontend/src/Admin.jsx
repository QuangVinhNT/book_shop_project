import {Outlet} from 'react-router-dom'
import Header from './components/admin/Header/Header'

export default function Admin() {
	return (
		<div className='max-w-screen-2xl mx-auto'>
			<div>
				<div>
					<Header />
					<Outlet />
				</div>
			</div>
		</div>
	)
}
