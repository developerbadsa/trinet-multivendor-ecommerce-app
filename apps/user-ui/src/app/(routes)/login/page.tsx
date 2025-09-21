"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import GoogleButton from "./../../shared/components/buttons/google-button";
import SectionDivider from "./../../shared/components/Divider/";
import { Eye, EyeOff } from "lucide-react";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [rememderMe, setRememberaMe] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="w-full py-10 min-h-[86vh] bg-gray-200">
      <h1 className="text-4xl font-semibold text-center text-black font-poppins">
        Login
      </h1>
      <p className="py-3 text-lg text-center text-black">Home. Login</p>

      <div className="flex justify-center w-full ">
        <div className="md:w-[480px] bg-white shadow rounded-lg py-4 px-8 ">
          <h3 className="mb-2 text-3xl font-semibold text-center">
            Login To Trinet Shop
          </h3>
          <p className="text-center text-gray-500">
            Dont have an account ?{" "}
            <Link className="text-blue-500" href={"/signup"}>
              Sign up
            </Link>
          </p>

          <div className="flex items-center justify-center py-2">
            {" "}
            <GoogleButton></GoogleButton>
          </div>

          <SectionDivider>or Sign in with Email </SectionDivider>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block mb-1 gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 mb-1 border border-gray-300 rounded outline-0"
              placeholder="support@trinet.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            {/* password */}
            <label className="block mb-1 gray-700">Password</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="w-full p-2 mb-1 border border-gray-300 rounded outline-0"
                placeholder="support@trinet.com"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  setPasswordVisible(!passwordVisible);
                }}
                className="absolute inset-y-0 flex items-center text-gray-500 right-3"
              >
                {passwordVisible ? <Eye /> : <EyeOff />}
              </button>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <div className="flex items-center justify-between my-4">
                <label className="flex items-center text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={rememderMe}
                    onChange={() => setRememberaMe(!rememderMe)}
                  />
                  Remember Me
                </label>
                <Link
                  href={"/forgot-password"}
                  className="text-sm text-blue-500"
                >
                  Forgot passoword
                </Link>
              </div>
            </div>

            <button className="w-full py-2 text-lg bg-black rounded cursor-pointer">
              Login
            </button>
            {serverError && <p className="text-red-500">{serverError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
