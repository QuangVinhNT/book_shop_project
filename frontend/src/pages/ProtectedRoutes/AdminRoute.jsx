import { Navigate } from 'react-router-dom'
import { useAuthStore } from '~/stores/authStore'
import { toast } from 'react-toastify'

export default function AdminRoute({ children }) {
  const account = useAuthStore(state => state.account)

  if (account && account.role === 'ADMIN') return children

  toast.error('You do not have sufficient access rights!', {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

  // Navigate về trang chủ
  return <Navigate to='/' />
}
