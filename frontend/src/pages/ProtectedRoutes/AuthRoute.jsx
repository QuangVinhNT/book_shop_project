import { Navigate } from 'react-router-dom'
import { useAuthStore } from '~/stores/authStore'

export default function AuthRoute({ children }) {
  const account = useAuthStore(state => state.account)

  if (account) {
    if (!account.isVerified) {
      return <Navigate to='/email-verify' />
    }
    return <Navigate to='/' />
  }
  return children
}