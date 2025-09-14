import React from "react";
import { logout } from "@/server/actions/auth";

const DashboardPage = () => {
  return (
    <form action={logout}>
      <button>Log out</button>
    </form>
  );
};

export default DashboardPage;
