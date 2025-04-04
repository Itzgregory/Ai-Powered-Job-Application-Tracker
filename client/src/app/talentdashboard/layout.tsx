
// "use client";
// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { RootState } from "@/redux/store/store";
// import Sidebar from "@/components/view/talentMenu/sidebar";
// import { FaBars } from "react-icons/fa";
// import styles from "./TalentDashboardLayout.module.css";
// import { isTokenValid, getUserRole } from "@/utils/auth/authutils"; // Use existing utilities

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state: RootState) => state.auth);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [authChecked, setAuthChecked] = useState(false);

//   // Simplified auth check using existing utilities
//   useEffect(() => {
//     // Phase 1: Immediate client check
//     if (!isTokenValid()) {
//       router.replace('/login');
//       return;
//     }

//     // Phase 2: Verify role (using existing getUserRole)
//     if (getUserRole() !== 'user') {
//       router.replace('/unauthorized');
//       return;
//     }

//     setAuthChecked(true);
//   }, [router]);

//   useEffect(() => {
//     const handleSidebarToggle = (event: Event) => {
//       const customEvent = event as CustomEvent<{ collapsed: boolean }>;
//       setSidebarCollapsed(customEvent.detail.collapsed);
//     };

//     window.addEventListener("sidebarStateChange", handleSidebarToggle);
//     return () => {
//       window.removeEventListener("sidebarStateChange", handleSidebarToggle);
//     };
//   }, []);

//   useEffect(() => {
//     const checkSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkSize();
//     window.addEventListener('resize', checkSize);
    
//     return () => {
//       window.removeEventListener('resize', checkSize);
//     };
//   }, []);
//   const showMobileMenuButton = isMobile;
  
//   return (
//     <div className={`${styles.dashboardLayout} ${sidebarCollapsed ? styles.collapsed : ""}`}>
//       <Sidebar />
      
//       {showMobileMenuButton && (
//         <button 
//           onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//           className={styles.mobileMenuButton}
//           aria-label={sidebarCollapsed ? "Open sidebar" : "Close sidebar"}
//         >
//           <FaBars size={24} />
//         </button>
//       )}
      
//       <main className={styles.mainContent}>{children}</main>
//     </div>
//   );
// }


"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid } from "@/utils/auth/authutils";

export default function TalentDashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const router = useRouter();

  useEffect(() => {
    // Only run if middleware didn't set cookie
    if (!document.cookie.includes("auth-validated=true") && !isTokenValid()) {
      router.replace("/login");
    }
  }, []);

  return <>{children}</>;
}