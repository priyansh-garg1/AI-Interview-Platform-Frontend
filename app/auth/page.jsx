"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if (!email || !password || (isSignup && !name)) {
      setMessage("Please fill all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      let response;
      if (isSignup) {
        response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
      } else {
        response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Something went wrong.');
      }

      if (data.token) {
        localStorage.setItem('token', data.token); // Store the token
        localStorage.setItem("user",JSON.stringify(data.user))
        setMessage(isSignup ? "Registration successful!" : "Login successful.");
        router.replace("/dashboard"); // Redirect to dashboard on success
      } else {
        setMessage(data.msg || "Operation successful, but no token received.");
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = async () => {
    setMessage("Guest login is not available at the moment.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        {/* Left content: form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <Image src="/logo.png" alt="AI Recruiter Logo" width={40} height={40} />
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-blue-500">AI</span>Recruiter
            </h1>
          </div>

          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            {isSignup ? "Create your account 🚀" : "Welcome back 👋"}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {isSignup
              ? "Sign up to start using your AI recruitment assistant."
              : "Log in to continue your AI hiring journey."}
          </p>

          {isSignup && (
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2 border rounded-md mb-4 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md mb-4 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md mb-4 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (isSignup ? "Signing up..." : "Logging in...") : isSignup ? "Sign Up" : "Login"}
          </Button>

          <Button
            variant="outline"
            className="w-full mt-3 py-3 rounded-lg hover:bg-gray-100"
            onClick={loginAsGuest}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login as Guest"}
          </Button>

          {message && <p className="text-sm mt-4 text-blue-600">{message}</p>}

          <p className="text-xs text-gray-400 mt-6">
            Powered by AI to simplify your hiring journey.
          </p>

          <p className="text-sm mt-4 text-gray-600">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              className="text-blue-500 underline ml-1"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Login" : "Sign up"}
            </button>
          </p>
        </div>

        {/* Right content: image */}
        <div className="hidden md:block md:w-1/2 bg-gray-100">
          <Image
            src="/login.png"
            alt="Login Illustration"
            width={500}
            height={500}
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
