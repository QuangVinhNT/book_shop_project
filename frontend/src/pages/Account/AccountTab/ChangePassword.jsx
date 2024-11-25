import { useState } from "react"
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
function ChangePassword() {
  const [showCurPassword, setShowCurPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [curPassword, setCurPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  return (
    <div>
      {/* Change password */}
      <div>
        <h6 className='font-bold mb-2'>Change password</h6>
        <div className='flex flex-col gap-1 mb-4 relative'>
          <label
            className='text-sm text-gray-500 font-semibold'
            htmlFor='currentPassword'
          >
            Current password
          </label>
          <input
            className='border border-gray-300 text-sm px-3 py-1.5 rounded-lg focus:outline-none'
            type={`${showCurPassword ? 'text' : 'password'}`}
            value={curPassword}
            onChange={(e) => {
              setCurPassword(e.target.value)
            }}
          />
          <div
            className='absolute right-2 top-1/2 translate-y-1/4 cursor-pointer'
            onClick={() => setShowCurPassword(!showCurPassword)}
          >
            {showCurPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
        <div className='flex flex-col gap-1 relative'>
          <label
            className='text-sm text-gray-500 font-semibold'
            htmlFor='newPassword'
          >
            New password
          </label>
          <input
            className={`border text-sm px-3 py-1.5 rounded-lg focus:outline-none ${curPassword === newPassword && newPassword !== ''
              ? 'border-red-500'
              : 'border-gray-300 '
              }`}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value)
            }}
            type={`${showNewPassword ? 'text' : 'password'}`}
          />
          <div
            className='absolute right-2 top-1/2 -translate-y-1/4 cursor-pointer'
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
          <span
            className={`text-xs ${curPassword === newPassword && newPassword !== ''
              ? 'text-red-400'
              : 'text-transparent'
              }`}
          >
            The new password must be different from the current password
          </span>
        </div>
        <div className='flex flex-col gap-1 relative'>
          <label
            className='text-sm text-gray-500 font-semibold'
            htmlFor='confirmNewPassword'
          >
            Confirm new password
          </label>
          <input
            className={`border text-sm px-3 py-1.5 rounded-lg focus:outline-none ${confirmPassword !== newPassword &&
              newPassword !== '' &&
              confirmPassword !== ''
              ? 'border-red-500'
              : 'border-gray-300 '
              }`}
            type={`${showConfirmPassword ? 'text' : 'password'}`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div
            className='absolute right-2 top-1/2 -translate-y-1/4 cursor-pointer'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
          <span
            className={`text-xs ${confirmPassword !== newPassword &&
              newPassword !== '' &&
              confirmPassword !== ''
              ? 'text-red-400'
              : 'text-transparent'
              }`}
          >
            The confirm password must be the same as the new password
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword