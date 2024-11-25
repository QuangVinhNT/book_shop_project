import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { environment } from "~/utils/environment";
import { useAuthStore } from "~/stores/authStore";
import { useState } from "react";

function Login() {
  const [inputEmailForgot, setInputEmailForgot] = useState('')
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const { register, formState: { isSubmitting, errors }, handleSubmit } = useForm({
    mode: "onTouched",
  });

  const setAccount = useAuthStore(state => state.setAccount)
  const setEmailForgot = useAuthStore(state => state.setEmailForgot)

  const onSubmit = async (loginData) => {
    const toastId = toast.loading('Please wait...')
    try {
      const response = await fetch(`${environment.BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...loginData }),
        credentials: 'include'
      })

      const data = await response.json()

      if (response.ok) {
        setAccount(data.account)
        if (!data.account.is_verified) {
          toast.update(toastId, { render: 'Email Verify', type: 'success', isLoading: false, autoClose: 3000 })
          navigate('/email-verify')
        }
        else {
          toast.update(toastId, { render: 'Login success', type: 'success', isLoading: false, autoClose: 3000 })
          navigate('/')
        }
      }
      else {
        toast.update(toastId, { render: data.message, type: 'error', isLoading: false, autoClose: 3000 })
      }
    } catch (error) {
      toast.update(toastId, { render: 'Internal server error', type: 'error', isLoading: false, autoClose: 3000 })
    }
  }

  const handleLoginGoogle = async (credentialResponse) => {
    const toastId = toast.loading("Please wait...");
    try {
      const { access_token } = credentialResponse;

      const response = await fetch(`${environment.BACKEND_URL}/auth/login/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token_id: access_token }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        toast.update(toastId, { render: data.message || 'Login success.', type: 'success', isLoading: false, autoClose: 3000 });
        setAccount(data.account);
        navigate('/')
      } else {
        toast.update(toastId, { render: data.message || 'Login failed.', type: 'error', isLoading: false, autoClose: 3000 });
      }
    } catch (error) {
      toast.update(toastId, { render: 'Internal server error.', type: 'error', isLoading: false, autoClose: 3000 });
    }
  };

  const sendEmailForgotPassword = async () => {
    const toastId = toast.loading('Please wait...')
    try {
      const response = await fetch(`${environment.BACKEND_URL}/auth/send-email-forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: inputEmailForgot }),
        credentials: 'include'
      })

      const data = await response.json()

      if (response.ok) {
        setEmailForgot(data.email)
        navigate('/forgot-password')
        toast.dismiss(toastId)
      }
      else {
        toast.update(toastId, { render: data.message || 'Email not exists', type: 'error', isLoading: false, autoClose: 3000 })
      }
    } catch (error) {
      toast.update(toastId, { render: 'Internal server error', type: 'error', isLoading: false, autoClose: 3000 })
    }
  }

  const login = useGoogleLogin({
    onSuccess: tokenResponse => handleLoginGoogle(tokenResponse)
  })

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("email", {
                    required: 'Email is required',
                    pattern: {
                      value: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                      message: 'Email invalid'
                    }
                  })}
                />
                <p className="text-red-400">{errors.email?.message}</p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Mật khẩu phải có ít nhất 6 kí tự'
                    }
                  })}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <p className="text-red-400">{errors.password?.message}</p>
              </div>
              <div className="flex items-center justify-end">
                <button type="button" onClick={() => setShow(true)}
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                className={`${isSubmitting ? 'opacity-45 cursor-not-allowed' : ''} w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                disabled={isSubmitting}
              >
                Login
              </button>
              <button type="button" className="bg-red-600 text-white p-4" onClick={() => login()}>Login with google</button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to='/register'
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className={`${show ? 'show' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 bg-black/20 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full`}>
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <button onClick={() => setShow(false)} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="deleteModal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
            {/* <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg> */}
            <p className="mb-4 text-gray-500 dark:text-gray-300">quen mat khau hay nhap email vao day</p>
            <input value={inputEmailForgot} onChange={e => setInputEmailForgot(e.target.value)} type='em' className="border p-4" />
            <div className="flex justify-center items-center space-x-4">
              <button onClick={sendEmailForgotPassword} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-red-400 rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login
