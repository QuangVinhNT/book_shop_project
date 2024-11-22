import {Outlet} from 'react-router-dom'
import Header from './components/admin/Header/Header'
import Sidebar from './components/admin/Sidebar/Sidebar'

export default function Admin() {
	return (
		<div className='max-w-screen-2xl mx-auto'>
			<div className='flex h-screen overflow-hidden'>
				<Sidebar />
				<div className='w-[calc(100%-250px)]'>
					<Header />
					<div className='h-[calc(100vh-50px)] overflow-y-auto'>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	)
}
