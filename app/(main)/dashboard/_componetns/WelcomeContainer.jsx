"use client";

import { useUser } from "@/app/provider";
import React from "react";

function WelcomeContainer() {
  const { user } = useUser();

  const fullName = user?.user_metadata?.name || "";

  const initials = fullName
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <>
      {user && (
        <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Welcome Back, {fullName}!
            </h1>
            <h2 className="text-md text-gray-500">
              AI-Driven Interview Platform, Hassle-Free Hiring Process
            </h2>
          </div>

          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
            {initials}
          </div>
        </div>
      )}
    </>
  );
}

export default WelcomeContainer;
