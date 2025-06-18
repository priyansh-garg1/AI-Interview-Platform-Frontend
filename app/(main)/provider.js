'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "./_components/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WelcomeContainer from "./dashboard/_componetns/WelcomeContainer";

function DashboardProvider({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth");
    }
  }, [router]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full p-10">
        <WelcomeContainer />
        {children}
      </div>
    </SidebarProvider>
  );
}

export default DashboardProvider;
