"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import GoogleButton from "../../shared/components/buttons/google-button";
import SectionDivider from "../../shared/components/Divider";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  name: string;
  password: string;
};

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [canResend, setCanResend] = useState(true);
  const [timer, setTimer] = useState(60);
  const [userData, setUserData] = useState<FormData | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const navigate = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:6001/api/user-registration",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      setUserData(data);
      console.log("requesed");
      setShowOtp(true);
      toast.success(res.data.message || "Registered successfully!");
      //  here you can later toggle OTP form if needed
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRefs.current.length + 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.keyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // function to verify OTP and create user
  const handleVerifyOtp = async () => {
    try {
      const otpCode = otp.join(""); // join digits into single string
      if (otpCode.length !== 5) {
        toast.error("Please enter the full 5-digit OTP");
        return;
      }

      setLoading(true);

      const res = await axios.post(
        "http://localhost:6001/api/verify-user",
        {
          email: userData?.email,
          name: userData?.name,
          password: userData?.password,
          otp: otpCode,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(`Welcome ${res.data.user?.name || "User"}! Login now`);
      navigate.push("/login");
      // 👉 here you can redirect to dashboard if needed
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "OTP verification failed!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full py-10 min-h-[86vh] bg-gray-200">
      <h1 className="text-4xl font-bold text-center text-black font-poppins">
        Sign Up
      </h1>
      <p className="py-3 text-lg font-bold text-center text-black fofont-semibold">
        Home. Sign up
      </p>

      <div className="flex justify-center w-full ">
        <div className="md:w-[480px] bg-white shadow rounded-lg py-4 px-8 ">
          <h3 className="mb-2 text-3xl font-semibold text-center">
            Sign up To Trinet Shop
          </h3>
          <p className="text-center text-gray-500">
            Do You have an account ?{" "}
            <Link className="text-blue-500" href={"/login"}>
              Login
            </Link>
          </p>

          <div
            onClick={() => {
              console.log("clicking");
            }}
            className="flex items-center justify-center py-2"
          >
            {" "}
            <GoogleButton></GoogleButton>
          </div>

          <SectionDivider>or Sign Up with Email </SectionDivider>

          {/* form */}
          {!showOtp ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="block mb-1 gray-700">Name</label>
              <input
                type="text"
                className="w-full p-2 mb-1 border border-gray-300 rounded outline-0"
                placeholder="Rahim Badsa"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}

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
              <label className="block mb-2 gray-700">Password</label>
              <div className="relative mb-4">
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
              </div>

              <button className="w-full py-2 text-lg text-white bg-black rounded cursor-pointer">
                {"Sign Up"}
              </button>
              {serverError && <p className="text-red-500">{serverError}</p>}
            </form>
          ) : (
            <div>
              <h3 className="mb-4 text-xl font-semibold text-center">
                Enter OTP
              </h3>
              <div className="flex justify-center gap-7">
                {otp?.map((digit, idx) => (
                  <input
                    type={"text"}
                    key={idx}
                    ref={(el) => {
                      if (el) inputRefs.current[idx] = el;
                    }}
                    maxLength={1}
                    className="w-12 h-12 text-center border border-gray-500 ouline-none"
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  />
                ))}
              </div>
              <div className="flex flex-col items-center mt-6">
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="px-6 py-2 text-white bg-black rounded"
                >
                  {loading ? "Verifying..." : "Verify & Sign Up"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
