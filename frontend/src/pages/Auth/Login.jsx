import {useForm} from 'react-hook-form'
import {useGoogleLogin} from '@react-oauth/google'
import {toast} from 'react-toastify'
import {Link, useNavigate} from 'react-router-dom'
import {environment} from '~/utils/environment'
import {useAuthStore} from '~/stores/authStore'
import {useState} from 'react'
import loginBg from '~/assets/images/login_bg.png'
import {BsEnvelope} from 'react-icons/bs'
import {FiLock} from 'react-icons/fi'
import googleIcon from '~/assets/google_icon_colored.svg'
import { useCartStore } from '~/stores/cartStore'

function Login() {
	const [inputEmailForgot, setInputEmailForgot] = useState('')
	const [show, setShow] = useState(false)
	const navigate = useNavigate()
	const getQuantityCart = useCartStore(state => state.getQuantityCart)

	const {
		register,
		formState: {isSubmitting, errors},
		handleSubmit
	} = useForm({
		mode: 'onTouched'
	})

	const setAccount = useAuthStore((state) => state.setAccount)
	const setEmailForgot = useAuthStore((state) => state.setEmailForgot)

	const onSubmit = async (loginData) => {
		const toastId = toast.loading('Please wait...')
		try {
			const response = await fetch(`${environment.BACKEND_URL}/auth/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({...loginData}),
				credentials: 'include'
			})

			const data = await response.json()

			if (response.ok) {
				setAccount(data.account)
				if (!data.account.is_verified) {
					toast.update(toastId, {
						render: 'Email Verify',
						type: 'success',
						isLoading: false,
						autoClose: 3000
					})
					navigate('/email-verify')
				} else {
					toast.update(toastId, {
						render: 'Login success',
						type: 'success',
						isLoading: false,
						autoClose: 3000
					})
					await getQuantityCart()
					navigate('/')
				}
			} else {
				toast.update(toastId, {
					render: data.message,
					type: 'error',
					isLoading: false,
					autoClose: 3000
				})
			}
		} catch (error) {
			toast.update(toastId, {
				render: 'Internal server error',
				type: 'error',
				isLoading: false,
				autoClose: 3000
			})
		}
	}

	const handleLoginGoogle = async (credentialResponse) => {
		const toastId = toast.loading('Please wait...')
		try {
			const {access_token} = credentialResponse

			const response = await fetch(
				`${environment.BACKEND_URL}/auth/login/google`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({token_id: access_token}),
					credentials: 'include'
				}
			)

			const data = await response.json()

			if (response.ok) {
				await getQuantityCart()
				toast.update(toastId, {
					render: data.message || 'Login success.',
					type: 'success',
					isLoading: false,
					autoClose: 3000
				})
				
				setAccount(data.account)
				navigate('/')
			} else {
				toast.update(toastId, {
					render: data.message || 'Login failed.',
					type: 'error',
					isLoading: false,
					autoClose: 3000
				})
			}
		} catch (error) {
			toast.update(toastId, {
				render: 'Internal server error.',
				type: 'error',
				isLoading: false,
				autoClose: 3000
			})
		}
	}

	const sendEmailForgotPassword = async () => {
		const toastId = toast.loading('Please wait...')
		try {
			const response = await fetch(
				`${environment.BACKEND_URL}/auth/send-email-forgot-password`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({email: inputEmailForgot}),
					credentials: 'include'
				}
			)

			const data = await response.json()

			if (response.ok) {
				setEmailForgot(data.email)
				navigate('/forgot-password')
				toast.dismiss(toastId)
			} else {
				toast.update(toastId, {
					render: data.message || 'Email not exists',
					type: 'error',
					isLoading: false,
					autoClose: 3000
				})
			}
		} catch (error) {
			toast.update(toastId, {
				render: 'Internal server error',
				type: 'error',
				isLoading: false,
				autoClose: 3000
			})
		}
	}

	const login = useGoogleLogin({
		onSuccess: (tokenResponse) => handleLoginGoogle(tokenResponse)
	})

	return (
		<>
			{/* New login */}
			<div className='h-screen flex'>
				<img src={loginBg} alt='' className='w-3/5 object-cover' />
				<div className='w-2/5 pt-10'>
					<div className='flex items-center justify-center gap-1'>
						<img
							src='./images/luxana_book_store_logo.png'
							alt='Logo'
							className='w-[90px] p-[10px]'
						/>
						<span className='brand-font text-[32px] font-bold'>
							Book Luxana
						</span>
					</div>
					<h6 className='text-center'>Login into your account</h6>
					<form className='mt-10 px-20' onSubmit={handleSubmit(onSubmit)}>
						<div className='mb-5'>
							<label htmlFor='email' className=''>
								Email
							</label>
							<div className='flex items-center mt-1'>
								<input
									type='email'
									name=''
									id='email'
									className='bg-lightGray text-sm py-2.5 px-4 w-full rounded-l-md focus:outline-none'
									placeholder='example@gmail.com'
									{...register('email', {
										required: 'Email is required',
										pattern: {
											value:
												/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
											message: 'Email invalid'
										}
									})}
								/>
								<BsEnvelope className='text-white bg-primary size-10 p-2.5 rounded-md -ml-1' />
							</div>
							<p className='text-red-400'>{errors.email?.message}</p>
						</div>
						<div>
							<label htmlFor='password'>Password</label>
							<div className='flex items-center mt-1'>
								<input
									type='password'
									name=''
									id='password'
									placeholder='Enter your password'
									className='bg-lightGray text-sm py-2.5 px-4 w-full rounded-l-md focus:outline-none'
									{...register('password', {
										required: 'Password is required',
										minLength: {
											value: 6,
											message: 'Password must have at least 6 characters'
										}
									})}
								/>
								<FiLock className='text-white bg-primary size-10 p-2.5 rounded-md -ml-1' />
							</div>
							<p className='text-red-400'>{errors.password?.message}</p>
						</div>
						<div className='flex justify-end mt-4 mb-8 cursor-pointer'>
							<span
								className='underline text-sm font-medium text-cap'
								onClick={() => setShow(true)}
							>
								Forgot password?
							</span>
						</div>
						<button
							className={`${
								isSubmitting ? 'opacity-45 cursor-not-allowed' : ''
							} w-full bg-primary text-white py-2.5 rounded-md transition-all hover:brightness-125`}
							disabled={isSubmitting}
						>
							Login now
						</button>
						<button
							type='button'
							className='shadow-roundShadow shadow-light mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-md transition-all hover:bg-light hover:text-primary'
							onClick={() => login()}
						>
							<img src={googleIcon} alt='' className='size-5' />
							Sign In with Google
						</button>
						<span className='block text-cap text-sm text-center mt-8 mb-8 relative before:content-[""] before:absolute before:h-[1px] before:w-5/12 before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-cap after:content-[""] after:absolute after:h-[1px] after:w-5/12 after:right-0 after:top-1/2 after:-translate-y-1/2 after:bg-cap'>
							OR
						</span>
						<Link to='/register'>
							<button className='text-primary border-2 border-primary w-full py-2.5 rounded-md transition-all hover:bg-primary hover:text-white'>
								Sign up now
							</button>
						</Link>
					</form>
				</div>
			</div>

			{/* Forgot password */}
			<section className='bg-gray-50 dark:bg-gray-900'>
				<div
					className={`${
						show ? 'show' : 'hidden'
					} overflow-y-auto overflow-x-hidden fixed top-0 bg-black/20 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}
				>
					<div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 p-4 w-full max-w-md h-full md:h-auto'>
						<div className='relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5'>
							<button
								onClick={() => setShow(false)}
								type='button'
								className='text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
								data-modal-toggle='deleteModal'
							>
								<svg
									aria-hidden='true'
									className='w-5 h-5'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
										clipRule='evenodd'
									></path>
								</svg>
								<span className='sr-only'>Close modal</span>
							</button>
							{/* <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg> */}
							<p className='mb-4 text-gray-500 dark:text-gray-300'>
								Input your email to reset password
							</p>
							<input
								value={inputEmailForgot}
								onChange={(e) => setInputEmailForgot(e.target.value)}
								type='email'
								className='border px-4 py-1.5 focus:outline-none w-full'
							/>
							<div className='flex justify-center items-center space-x-4 mt-10'>
								<button
									onClick={sendEmailForgotPassword}
									data-modal-toggle='deleteModal'
									type='button'
									className='py-2 px-6 text-sm font-medium text-white bg-primary rounded-md transition-all hover:brightness-125'
								>
									SEND
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Login
