import { useAuthStore } from '@/stores/auth-store'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
  const account = useAuthStore(state => state.account)

  if (!account) {
    return <Navigate to='/login' />
  } else if (!account.isVerified) {
    return <Navigate to='/email-verify' />
  }
  return children
}