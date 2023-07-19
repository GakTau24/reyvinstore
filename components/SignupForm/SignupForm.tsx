"use client"
import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { InputErrors } from "@/helper/error";
import Link from "next/link";
import { loginUser } from "@/handler";
import { useRouter } from "next/navigation";
import { useSession, SessionProvider } from "next-auth/react";

const SignupForm = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState<InputErrors[]>([]);
  const [submitError, setSubmitError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const validateData = (): boolean => {
    const err = [];

    if (data.fullName?.length < 4) {
      err.push({ fullName: "Full name must be at least 4 characters long" });
    } else if (data.fullName?.length > 30) {
      err.push({ fullName: "Full name should be less than 30 characters" });
    }
    if (data.password?.length < 6) {
      err.push({ password: "Password should be at least 6 characters long" });
    }
    if (data.password !== data.confirmPassword) {
      err.push({ confirmPassword: "Passwords don't match" });
    }

    setValidationErrors(err);

    return err.length === 0;
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateData();
    if (isValid) {
      try {
        setLoading(true);
        const apiRes = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`,
          data
        );
        if (apiRes?.data?.success) {
          const loginRes = await loginUser({
            email: data.email,
            password: data.password,
          });
          if (loginRes && !loginRes.ok) {
            setSubmitError(loginRes.error || "");
          } else {
            router.push("/");
          }
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.error;
          setSubmitError(errorMsg);
        }
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-xl backdrop-brightness-125 shadow-xl rounded px-10 pt-6 pb-8 mb-4"
        onSubmit={handleSignUp}
      >
        <h1 className="text-xl text-center text-gray-700 font-bold py-3">
          Reyvin <span className="text-sky-400">Store</span>
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            className="shadow-xl appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-xl"
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleInputChange}
          />
          {validationErrors.map((error, index) => (
            <p key={index} className="text-red-500 text-xs italic">
              {error.fullName}
            </p>
          ))}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow-xl appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-xl"
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow-xl appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-xl"
            id="password"
            type="password"
            name="password"
            placeholder="******************"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow-xl appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-xl"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="******************"
            onChange={handleInputChange}
          />
        </div>
        {submitError && (
          <p className="text-red-500 text-xs italic pb-4">{submitError}</p>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-xl"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </div>
        <p className="text-gray-700 pt-3">
          Already have an account?{" "}
          <Link href={"/login"} className="text-sky-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

const SignupFormWrapper = () => (
  <SessionProvider>
    <SignupForm />
  </SessionProvider>
);

export default SignupFormWrapper;
