import { Navigate } from 'react-router-dom'
import { useAuthStore } from '~/stores/authStore'

export default function EmailVerificationRoute({ children }) {
  const account = useAuthStore(state => state.account)

  if (account && !account.is_verified) return children


  return !account ? <Navigate to='/login' /> : <Navigate to='/' />
}