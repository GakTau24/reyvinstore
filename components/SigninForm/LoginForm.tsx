"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { loginUser } from "@/handler";
import Link from "next/link";
import { useSession, SessionProvider } from "next-auth/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      const loginRes = await loginUser({ email, password });

      if (loginRes && !loginRes.ok) {
        setSubmitError(loginRes.error || "");
      } else {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMsg = error.response?.data?.error;
        setSubmitError(errorMsg);
      }
    }

    setLoading(false);
  };
  if (session) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-xl backdrop-brightness-125 shadow-xl rounded px-10 pt-6 pb-8 mb-4"
        onSubmit={handleLogin}
      >
        <h1 className="text-xl text-center text-gray-700 font-bold py-3">
          Reyvin <span className="text-sky-400">Store</span>
        </h1>
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
            value={email}
            onChange={handleEmailChange}
            required
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
            value={password}
            onChange={handlePasswordChange}
            required
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
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
        {/* <p className="text-gray-700 pt-3">
          Dont have an account?{" "}
          <Link href={"/signup"} className="text-sky-400">
            Sign Up
          </Link>
        </p> */}
      </form>
    </div>
  );
};

const SignupFormWrapper = () => (
    <SessionProvider>
      <LoginForm />
    </SessionProvider>
  );

export default SignupFormWrapper;
