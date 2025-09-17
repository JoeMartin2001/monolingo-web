import React from "react";
import { BottomBar } from "@/components/layout/bottom-bar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-16">{children}</main>
      <BottomBar />
    </div>
  );
};

export default Layout;
