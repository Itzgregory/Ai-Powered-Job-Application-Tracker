"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import Image from "next/image";
import logo from "../../../../public/asset/logo.png";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);
      if (mobile && !mobileOpen) {
        window.dispatchEvent(
          new CustomEvent('sidebarStateChange', { 
            detail: { collapsed: true } 
          })
        );
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileOpen]);

  useEffect(() => {
    if (isMobile) {
      setMobileOpen(!collapsed);
    }
  }, [collapsed, isMobile]);

  const toggleSidebar = () => {
    const newState = !collapsed;
    if (isMobile) {
      setMobileOpen(!collapsed);
    }
    window.dispatchEvent(
      new CustomEvent('sidebarStateChange', { 
        detail: { collapsed: newState } 
      })
    );
  };

  const menuItems = [
    { name: "Dashboard", path: "/talentdashboard" },
    { name: "Jobs", path: "/talentdashboard/jobs" },
    { name: "Profile", path: "/talentdashboard/profile" },
    { name: "Settings", path: "/talentdashboard/settings" },
  ];

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
                <Image 
                  src={logo} 
                  alt="Logo" 
                  className={styles.logo}
                  width={40}
                  height={40}
                  priority
                />
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
      {isMobile && !collapsed && (
        <div className={styles.overlay} onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;