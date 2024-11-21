import {Outlet} from 'react-router-dom'
import Header from './components/admin/Header/Header'
import Sidebar from './components/admin/Sidebar/Sidebar'

export default function Admin() {
	return (
		<div className='max-w-screen-2xl mx-auto'>
			<div className='flex'>
				<Sidebar />
				<div className='flex flex-col w-[calc(100%-250px)]'>
					<Header />
					<Outlet />
				</div>
			</div>
		</div>
	)
}
