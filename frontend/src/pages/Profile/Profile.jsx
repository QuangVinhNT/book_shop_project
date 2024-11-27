import React, { useState, useEffect } from "react";
import { useAuthStore } from "~/stores/authStore";

function Profile() {

  const account = useAuthStore(state => state.account)

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <div className="flex items-center space-x-6">
        <img
          src={account.image || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-semibold">{account.full_name}</h1>
          <p className="text-gray-600">{account.email}</p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-700">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <p className="mt-1 text-gray-800">{account.phone_number}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Address</label>
            <p className="mt-1 text-gray-800">{account.address}</p>
          </div>
        </div>
      </div>
      {!account.is_social_login && (
        <div className="mt-6">
          <button
            // onClick={handleChangePassword}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Change Password
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
