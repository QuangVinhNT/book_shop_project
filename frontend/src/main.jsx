import { createRoot } from 'react-dom/client'
import './index.css'
import Swiper from 'swiper';
import 'swiper/css';
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
	<GoogleOAuthProvider clientId="496139560764-n7u29ks4p1untriic3l6j9f1sfc23jne.apps.googleusercontent.com">
		<App />
	</GoogleOAuthProvider>
)
