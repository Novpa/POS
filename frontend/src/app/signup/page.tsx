"use client";

import { createUserSchema } from "@/lib/schemas/signupSchema";
import { useAuth } from "@/store/useAuth";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

interface SingupInput {
  firstName: string;
  lastName: string;
  role: "CASHIER" | "SUPER_ADMIN";
  email: string;
  password: string;
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);
  const user = useAuth((state) => state.user);
  const handleSignup = async ({
    firstName,
    lastName,
    role,
    email,
    password,
  }: SingupInput) => {
    try {
      if (user?.role !== "SUPER_ADMIN") {
        //FIXME
        setAuthError(true);
        return;
      }

      const res = await axios.post(
        "http://localhost:8000/api/auth/signup",
        { firstName, lastName, role, email, password },
        { withCredentials: true },
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      role: "SUPER_ADMIN",
      email: "",
      password: "",
    },
    validationSchema: createUserSchema,
    onSubmit: (values: SingupInput) => {
      handleSignup(values);
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
            S
          </div>
          <h1 className="text-xl font-semibold text-gray-900">SkyPOS</h1>
          <p className="text-sm text-gray-500">Point of Sale Management</p>
        </div>

        {/* Title */}
        <h2 className="mb-6 text-center text-lg font-semibold text-gray-800">
          Create new account
        </h2>
        {authError && (
          <p className="mb-6 text-center bg-amber-100 text-sm text-gray-800 px-2 py-2">
            Only super admin can register
          </p>
        )}
        <form onSubmit={formik.handleSubmit}>
          {/* First & Last Name Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                placeholder="John"
                className="w-full text-zinc-600 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {formik.errors.firstName ? (
                <p className=" py-2 text-sm text-red-500">
                  {formik.errors.firstName}
                </p>
              ) : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                placeholder="Doe"
                className="w-full  text-zinc-600  rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {formik.errors.lastName ? (
                <p className=" py-2 text-sm text-red-500">
                  {formik.errors.lastName}
                </p>
              ) : null}
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="name@company.com"
              className="w-full  text-zinc-600  rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {formik.errors.email ? (
              <p className=" py-2 text-sm text-red-500">
                {formik.errors.email}
              </p>
            ) : null}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Create a password"
                className="w-full  text-zinc-600  rounded-lg border border-gray-300 px-4 py-2.5 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? (
                  <HiOutlineEyeOff className="h-5 w-5" />
                ) : (
                  <HiOutlineEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {formik.errors.password ? (
              <p className=" py-2 text-sm text-red-500">
                {formik.errors.password}
              </p>
            ) : null}
          </div>

          {/* Role Select */}
          <div className="mb-8">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Account Role
            </label>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              className="w-full text-zinc-600  rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
              <option value="">Select Role</option>
              <option value="SUPER_ADMIN">SUPER ADMIN</option>
              <option value="CASHIER">CASHIER</option>
            </select>
            {formik.errors.role ? (
              <p className=" py-2 text-sm text-red-500">{formik.errors.role}</p>
            ) : null}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-md shadow-blue-100">
            Sign Up →
          </button>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-400 border-t pt-6">
          <span>SkyPOS Enterprise v2.4.1</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-600">
              Support
            </a>
            <a href="#" className="hover:text-gray-600">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
