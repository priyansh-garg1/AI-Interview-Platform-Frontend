import React from "react";
import { AppSidebar } from "./_components/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WelcomeContainer from "./dashboard/_componetns/WelcomeContainer";

function DashboardProvider({ children }) {
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
