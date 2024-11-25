import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStore } from '~/stores/authStore';
import { environment } from '~/utils/environment';

function ForgotPassword() {
  const [step, setStep] = useState(1); // Step 1: Enter Code, Step 2: Enter New Password
  const [verifyCode, setVerifyCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate()

  const emailForgot = useAuthStore(state => state.emailForgot)

  const handleVerifyCodeSubmit = async () => {
    if (!verifyCode) {
      toast.warn('Enter code')
      return
    }

    const toastId = toast.loading('Please wait...')
    try {
      const response = await fetch(`${environment.BACKEND_URL}/auth/send-code-forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: verifyCode, email: emailForgot }),
        credentials: 'include'
      })

      const data = await response.json()

      if (response.ok) {
        setStep(2)
        setErrorMessage('')
        toast.update(toastId, { render: 'Verify success', type: 'success', isLoading: false, autoClose: 3000 })
      }
      else {
        toast.update(toastId, { render: data.message || 'Verify code error', type: 'error', isLoading: false, autoClose: 3000 })
      }
    } catch (error) {
      toast.update(toastId, { render: 'Internal server error', type: 'error', isLoading: false, autoClose: 3000 })
    }
  };

  const handlePasswordSubmit = async () => {
    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please try again.');
      return;
    }

    const toastId = toast.loading('Please wait...')

    try {
      const response = await fetch(`${environment.BACKEND_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword, email: emailForgot }),
        credentials: 'include'
      })

      if (response.ok) {
        navigate('/login')
        toast.update(toastId, { render: 'Reset password success', type: 'success', isLoading: false, autoClose: 3000 })
      }
      else {
        toast.update(toastId, { render: 'Reset password failed', type: 'error', isLoading: false, autoClose: 3000 })
      }

    } catch (error) {
      toast.update(toastId, { render: 'Internal server error', type: 'error', isLoading: false, autoClose: 3000 })
    }

    setErrorMessage('');
  };

  return (
    <div className="max-w-md mx-auto p-6 text-center bg-gray-50 shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Forgot Password</h1>
      {step === 1 && (
        <div>
          <p className="mb-4 text-gray-700">
            Please enter the verification code sent to your email.
          </p>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verifyCode}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setVerifyCode(e.target.value)}
          />
          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}
          <button
            onClick={handleVerifyCodeSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Verify Code
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="mb-4 text-gray-700">Please enter your new password.</p>
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errorMessage && (
            <p className="text-red-500 mb-4">{errorMessage}</p>
          )}
          <button
            onClick={handlePasswordSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Password
          </button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
