import {useForm} from 'react-hook-form'
import {useGoogleLogin} from '@react-oauth/google'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useAuthStore} from '~/stores/authStore'
import {environment} from '~/utils/environment'
import signupBg from '~/assets/images/signup_bg.png'
import googleIcon from '~/assets/google_icon_colored.svg'

function Register() {
	const navigate = useNavigate()

	const {
		register,
		formState: {isSubmitting, errors},
		handleSubmit,
		watch
	} = useForm({
		mode: 'onTouched'
	})

	const setAccount = useAuthStore((state) => state.setAccount)

	const onSubmit = async (registerData) => {
		const toastId = toast.loading('Please wait...')
		try {
			const response = await fetch(`${environment.BACKEND_URL}/auth/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({...registerData}),
				credentials: 'include'
			})

			const data = await response.json()

			if (response.ok) {
				setAccount(data.account)
				navigate('/email-verify')
				toast.update(toastId, {
					render: 'Register success',
					type: 'success',
					isLoading: false,
					autoClose: 3000
				})
			} else {
				toast.update(toastId, {
					render: data.errors?.email[0],
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

	const handleRegisterGoogle = async (credentialResponse) => {
		const toastId = toast.loading('Please wait...')
		try {
			const {access_token} = credentialResponse

			const response = await fetch(
				`${environment.BACKEND_URL}/auth/register/google`,
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
				toast.update(toastId, {
					render: data.message || 'Register success.',
					type: 'success',
					isLoading: false,
					autoClose: 3000
				})
				setAccount(data.account)
				navigate('/')
			} else {
				toast.update(toastId, {
					render: data.message || 'Register failed.',
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

	const registerGoogle = useGoogleLogin({
		onSuccess: (tokenResponse) => handleRegisterGoogle(tokenResponse)
	})

	return (
		<div className='h-screen flex'>
			<div className='w-1/2 pt-10'>
				<div className='flex items-center justify-center gap-1'>
					<img
						src='./images/luxana_book_store_logo.png'
						alt='Logo'
						className='w-[90px] p-[10px]'
					/>
					<span className='brand-font text-[32px] font-bold'>Book Luxana</span>
				</div>
				<h6 className='text-center'>Sign up into your account</h6>
				<form
					className='mt-10 px-10 flex gap-5'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='w-1/2'>
						<div className='relative'>
							<label htmlFor='fullname' className='block'>
								Full name
							</label>
							<input
								type='text'
								name=''
								id=''
								placeholder='Enter your fullname'
								className='bg-lightGray w-full py-2.5 px-4 rounded-md focus:outline-none mt-1 text-sm'
								{...register('fullName', {
									required: 'Full name is required'
								})}
							/>
							<p className='text-red-400 absolute'>
								{errors.fullName?.message}
							</p>
						</div>
						<div className='pb-10 relative'>
							<label htmlFor='password' className='block mt-8'>
								Password
							</label>
							<input
								type='password'
								name=''
								id=''
								placeholder='Enter your password'
								className='bg-lightGray w-full py-2.5 px-4 rounded-md focus:outline-none mt-1 text-sm'
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 6,
										message: 'Password must have at least 6 characters'
									}
								})}
							/>
							<p className='text-red-400 absolute'>
								{errors.password?.message}
							</p>
						</div>
						<button
							className={`${
								isSubmitting ? 'opacity-45 cursor-not-allowed' : ''
							} w-full bg-primary py-2.5 rounded-md text-white transition-all hover:brightness-125`}
							disabled={isSubmitting}
						>
							Sign up
						</button>
					</div>
					<div className='w-1/2'>
						<div className='relative'>
							<label htmlFor='email' className='block'>
								Email
							</label>
							<input
								type='email'
								name=''
								id=''
								placeholder='example@gmail.com'
								className='bg-lightGray w-full py-2.5 px-4 rounded-md focus:outline-none mt-1 text-sm'
								{...register('email', {
									required: 'Email is required',
									pattern: {
										value:
											/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
										message: 'Email invalid'
									}
								})}
							/>
							<p className='text-red-400 absolute'>{errors.email?.message}</p>
						</div>
						<div className='pb-10 relative'>
							<label htmlFor='confirmPassword' className='block mt-8'>
								Confirm password
							</label>
							<input
								type='password'
								name=''
								id=''
								placeholder='Enter your confirm password'
								className='bg-lightGray w-full py-2.5 px-4 rounded-md focus:outline-none mt-1 text-sm'
								{...register('confirmPassword', {
									required: 'Confirm password is required',
									validate: (value) => {
										if (watch('password') != value) {
											return 'Your passwords do no match'
										}
									}
								})}
							/>
							<p className='text-red-400 absolute'>
								{errors.confirmPassword?.message}
							</p>
						</div>
						<button
							className='shadow-roundShadow shadow-light flex items-center justify-center gap-2 w-full py-2.5 rounded-md transition-all hover:bg-light hover:text-primary'
							onClick={() => registerGoogle()}
						>
							<img src={googleIcon} alt='' className='size-5' />
							Sign up with Google
						</button>
					</div>
				</form>
				<span className='block text-center mt-5'>
					You have an account?{' '}
					<Link
						to={'/login'}
						className='cursor-pointer underline text-primary font-semibold transition-all hover:brightness-125'
					>
						Login
					</Link>
				</span>
			</div>
			<div className='w-1/2 flex justify-center items-center bg-lightGray'>
				<img src={signupBg} alt='' />
			</div>
		</div>
	)
}

export default Register
