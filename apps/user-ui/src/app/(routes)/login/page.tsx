"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import GoogleButton from "./../../shared/components/buttons/google-button";
import SectionDivider from "./../../shared/components/Divider/";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [rememderMe, setRememberMe] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {};

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
            <input type="text" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
