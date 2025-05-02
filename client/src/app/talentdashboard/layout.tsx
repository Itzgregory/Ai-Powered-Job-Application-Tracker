"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/features/dashboardView/components/talentMenu/sidebar";
import { isTokenValid } from "@/utils/auth/authutils";
import styles from "./TalentDashboardLayout.module.css";

export default function TalentDashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const handleSidebarToggle = (event: Event) => {
      const customEvent = event as CustomEvent<{ collapsed: boolean }>;
      setSidebarCollapsed(customEvent.detail.collapsed);
    };
    
    window.addEventListener("sidebarStateChange", handleSidebarToggle);
    return () => window.removeEventListener("sidebarStateChange", handleSidebarToggle);
  }, []);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    const isAuthenticated = document.cookie.includes("auth-validated=true") || isTokenValid();
    setIsLoading(!isAuthenticated);
  }, [router]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar collapsed={isMobile ? false : sidebarCollapsed} />
      <main className={`${styles.contentArea} ${!isMobile && sidebarCollapsed ? styles.contentWithCollapsedSidebar : ''}`}>
        {children}
      </main>
    </div>
  );
}