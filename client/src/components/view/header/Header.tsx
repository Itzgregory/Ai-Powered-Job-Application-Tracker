"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { logout } from "@/redux/slices/user/authSlice";
import logo from "../../../../public/asset/logo.png";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";

const Header = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();
    const isDashboardRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/talentdashboard');
    const user = useSelector((state: RootState) => state.auth.user);
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    const handleLogout = () => {
        dispatch(logout());
        router.push("/login");
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsNavbarVisible(window.scrollY < lastScrollY || window.scrollY < 100);
            setLastScrollY(window.scrollY);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    if (isDashboardRoute) {
        return null; 
    }
    
    return (
        <>
            <nav
                className={styles.navbar}
                style={{
                    transform: isNavbarVisible ? "translateY(0)" : "translateY(-100%)",
                    transition: "transform 0.3s ease-in-out",
                }}
            >
                <div className={styles.container}>
                    <Link href="/" className={styles.brand}>
                        <img src={logo.src} alt="Logo" className={styles.logo} />
                        <span className={styles.brandName}>AiPowered</span>
                    </Link>

                    <div className={styles.desktopMenu}>
                        <Link href="/" className={styles.menuItem}>
                            Home
                        </Link>
                        <Link href="/clients" className={styles.menuItem}>
                            Clients
                        </Link>
                        <Link href="/talents" className={styles.menuItem}>
                            Talents
                        </Link>
                        {user ? (
                            <>
                                <Link href="/talentdashboard" className={`${styles.menuItem} global-button`}> 
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className={styles.logoutButton}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className={styles.menuItem}>
                                    Login
                                </Link>
                                <Link href="/register" className={styles.menuItem}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    <button
                        className={styles.mobileMenuButton}
                        onClick={() => setSideMenuOpen(!sideMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {sideMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {sideMenuOpen && (
                <>
                    <div className={styles.overlay} onClick={() => setSideMenuOpen(false)} />
                    <div className={styles.sideMenu}>
                        <div className={styles.sideMenuHeader}>
                            <button
                                className={styles.closeButton}
                                onClick={() => setSideMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <X size={28} />
                            </button>
                        </div>
                        <div className={styles.sideMenuItems}>
                            <Link href="/" className={styles.sideMenuItem} onClick={() => setSideMenuOpen(false)}>
                                Home
                            </Link>
                            <Link href="/clients" className={styles.sideMenuItem} onClick={() => setSideMenuOpen(false)}>
                                Clients
                            </Link>
                            <Link href="/talents" className={styles.sideMenuItem} onClick={() => setSideMenuOpen(false)}>
                                Talents
                            </Link>
                            {user ? (
                                <>
                                    <Link href="/dashboard" className={styles.sideMenuItem} onClick={() => setSideMenuOpen(false)}>
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => { handleLogout(); setSideMenuOpen(false); }}
                                        className={styles.sideMenuItem}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className={styles.sideMenuItem} onClick={() => setSideMenuOpen(false)}>
                                        Login
                                    </Link>
                                    <Link href="/register" className={styles.sideMenuItem} onClick={() => setSideMenuOpen(false)}>
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Header;