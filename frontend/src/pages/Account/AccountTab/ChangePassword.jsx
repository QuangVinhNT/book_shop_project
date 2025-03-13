import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ChangePassword() {
  const [checkCurrentPassword, setCheckCurrentPassword] = useState(false);
  const [showCurPassword, setShowCurPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const newPasswordValue = watch("newPassword");

  return (
    <>
      {!checkCurrentPassword && <form>
        {/* Current Password */}
        <div className="flex flex-col gap-1 mb-4 relative">
          <label
            className="text-sm text-gray-500 font-semibold"
            htmlFor="currentPassword"
          >
            Current password
          </label>
          <input
            className="border border-gray-300 text-sm px-3 py-1.5 rounded-lg focus:outline-none"
            type={`${showCurPassword ? "text" : "password"}`}
            {...register("curPassword", { required: "Current password is required" })}
          />
          <div
            className="absolute right-2 top-1/2 translate-y-1/4 cursor-pointer"
            onClick={() => setShowCurPassword(!showCurPassword)}
          >
            {showCurPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
          {errors.curPassword && (
            <span className="text-xs text-red-400">{errors.curPassword.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Submit
        </button>
      </form>
      }
      {checkCurrentPassword && <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h6 className="font-bold mb-2">Change password</h6>

          {/* New Password */}
          <div className="flex flex-col gap-1 relative">
            <label
              className="text-sm text-gray-500 font-semibold"
              htmlFor="newPassword"
            >
              New password
            </label>
            <input
              className="border text-sm px-3 py-1.5 rounded-lg focus:outline-none"
              type={`${showNewPassword ? "text" : "password"}`}
              {...register("newPassword", {
                required: "New password is required",
                validate: (value) =>
                  value !== watch("curPassword") ||
                  "The new password must be different from the current password",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            <div
              className="absolute right-2 top-1/2 -translate-y-1/4 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
            {errors.newPassword && (
              <span className="text-xs text-red-400">{errors.newPassword.message}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1 relative">
            <label
              className="text-sm text-gray-500 font-semibold"
              htmlFor="confirmNewPassword"
            >
              Confirm new password
            </label>
            <input
              className="border text-sm px-3 py-1.5 rounded-lg focus:outline-none"
              type={`${showConfirmPassword ? "text" : "password"}`}
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === newPasswordValue || "Passwords do not match",
              })}
            />
            <div
              className="absolute right-2 top-1/2 -translate-y-1/4 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-red-400">{errors.confirmPassword.message}</span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Submit
        </button>
      </form>}
    </>
  );
}

export default ChangePassword;
