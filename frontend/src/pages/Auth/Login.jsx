import { useForm } from "react-hook-form";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { environment } from "~/utils/environment";
import { useAuthStore } from "~/stores/authStore";

function Login() {
  const navigate = useNavigate()

  const { register, formState: { isSubmitting, errors }, handleSubmit } = useForm({
    mode: "onTouched",
  });

  const setAccount = useAuthStore(state => state.setAccount)

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
                <a
                  href="#"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Forgot password?
                </a>
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
    </section>
  );
}

export default Login
