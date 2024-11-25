import { useAuthStore } from '@/stores/auth-store'
import { Navigate } from 'react-router-dom'

export default function AdminRoute({ children }) {
  const account = useAuthStore(state => state.account)

  if (account && account.role === 'ADMIN') return children

  return <Navigate to='/' />
}