import React from "react";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex  w-full max-w-[78rem] mx-auto">
      <Sidebar />
      <section className="border-x   min-h-svh p-2 w-full">{children}</section>
      <RightSidebar />
    </section>
  );
}
