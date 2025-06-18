"use client";

import React, { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

function WelcomeContainer() {
  const router = useRouter();
  const { user, fullName, initials } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth");
  };

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold cursor-pointer">
                {initials}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-4">
              <DropdownMenuItem className="flex items-center gap-2 mb-2 cursor-default hover:bg-transparent focus:bg-transparent">
                <User className="h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">{fullName}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </>
  );
}

export default WelcomeContainer;
