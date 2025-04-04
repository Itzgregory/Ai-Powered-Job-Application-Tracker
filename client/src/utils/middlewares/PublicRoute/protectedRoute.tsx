"use client";
import LoadingPage from "@/utils/loader/loadingPage";

export default function ProtectedRoute({ 
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}