"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import logo from "../../../../public/asset/logo.png";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);
      if (mobile && !mobileOpen) {
        setCollapsed(true);
      }
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleSidebarToggle = (event: Event) => {
      const customEvent = event as CustomEvent<{ collapsed: boolean }>;
      setCollapsed(customEvent.detail.collapsed);
      
      if (isMobile) {
        setMobileOpen(!customEvent.detail.collapsed);
      }
    };

    window.addEventListener("sidebarStateChange", handleSidebarToggle);
    return () => {
      window.removeEventListener("sidebarStateChange", handleSidebarToggle);
    };
  }, [isMobile]);

  const menuItems = [
    { name: "Dashboard", path: "/talentdashboard" },
    { name: "Jobs", path: "/talentdashboard/jobs" },
    { name: "Profile", path: "/talentdashboard/profile" },
    { name: "Settings", path: "/talentdashboard/settings" },
  ];

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    
    if (isMobile) {
      setMobileOpen(!collapsed);
    }
    
    window.dispatchEvent(
      new CustomEvent('sidebarStateChange', { 
        detail: { collapsed: newState } 
      })
    );
  };

  return (
    <>
      <aside 
        className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""} ${
          isMobile && !collapsed ? styles['mobile-open'] : ""
        }`}
      >
        <div className={styles.sidebarContent}>
          <div className={styles.header}>
            {!collapsed && 
              <Link href="/" className={styles.brand}>
                <img src={logo.src} alt="Logo" className={styles.logo} />
                <span className={styles.brandName}>AiPowered</span>
              </Link>
            }
            {!isMobile && (
              <button 
                onClick={toggleSidebar} 
                className={styles.toggleButton}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <FaBars size={20} />
              </button>
            )}
          </div>
          {!collapsed && (
            <nav>
              <ul className={styles.menuList}>
                {menuItems.map((item) => (
                  <li key={item.path} className={styles.menuItem}>
                    <Link
                      href={item.path}
                      className={`${styles.link} ${
                        pathname === item.path ? styles.activeLink : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </aside>
      
      {/* Show overlay when sidebar is open on mobile */}
      {isMobile && !collapsed && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;