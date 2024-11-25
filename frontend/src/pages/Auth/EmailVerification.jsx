import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "~/stores/authStore";
import { environment } from "~/utils/environment";

const EmailVerification = () => {
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState('')
  const account = useAuthStore(state => state.account)
  const setAccount = useAuthStore(state => state.setAccount)

  const navigate = useNavigate()

  const handleSendCode = async () => {
    if (!code) {
      toast.warn('Enter code')
      return
    }

    setLoading(true)
    const toastId = toast.loading('Please wait...')
    try {
      const response = await fetch(`${environment.BACKEND_URL}/auth/email-verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
        credentials: 'include'
      })

      const data = await response.json()

      if (response.ok) {
        setAccount(data.account)
        navigate('/')
        toast.update(toastId, { render: 'Verify success', type: 'success', isLoading: false, autoClose: 3000 })
      }
      else {
        toast.update(toastId, { render: data.message, type: 'error', isLoading: false, autoClose: 3000 })
      }
    } catch (error) {
      toast.update(toastId, { render: 'Internal server error', type: 'error', isLoading: false, autoClose: 3000 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center flex-col mt-5">
      <section className="max-w-2xl mx-auto bg-white">
        <header className="py-8 flex justify-center w-full">
          <a href="#">
            <img
              src="https://www.tailwindtap.com/_next/static/media/nav-logo.371aaafb.svg"
              alt="tailwindtaplogo"
            />
          </a>
        </header>
        <div className="h-[200px] bg-[#365CCE] w-full text-white flex items-center justify-center flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-white"></div>
            <EmailIcon />
            <div className="w-10 h-[1px] bg-white"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-xl sm:text-3xl tracking-wider font-bold capitalize">
              Verify your E-mail Address
            </div>
          </div>
        </div>
        <p className="text-gray-500  px-5 sm:px-10 mt-8">
          Tao đã gửi email xác thực tới mày rồi nhập cái code đó vào đây để tiếp tục
        </p>
        <main className="mt-8 px-5 sm:px-10">
          <h2 className="text-gray-700 ">Hello {account?.fullName}</h2>
          <div className="flex items-center mt-4 gap-x-4">
            <input
              name="code"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
        </main>
        <button className={`bg-red-500 text-white p-4 ${loading ? 'opacity-50' : ''}`} disabled={loading} onClick={handleSendCode}>Send</button>
      </section>
    </div>
  );
};
export default EmailVerification;

const EmailIcon = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"></path>
    </svg>
  );
};