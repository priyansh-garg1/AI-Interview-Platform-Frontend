import React from "react";
import WelcomeContainer from "./_componetns/WelcomeContainer";
import CreateOptions from "./_componetns/CreateOptions";
import LatestInterviewList from "./_componetns/LatestInterviewList";

function Dashboard() {
  return (
    <div>
      <h2 className="my-3 font-bold text-2xl">Dashboard</h2>
      <CreateOptions />
      <LatestInterviewList />
    </div>
  );
}

export default Dashboard;
