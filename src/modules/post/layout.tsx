import { SocialPostProvider } from "@/context/socialPostContext";
import React from "react";

export default function PostLayoutView({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SocialPostProvider>{children}</SocialPostProvider>;
}
