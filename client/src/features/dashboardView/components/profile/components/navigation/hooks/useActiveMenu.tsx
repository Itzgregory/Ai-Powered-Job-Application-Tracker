// 'use client';

// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import { menuItems } from '../utills/menuItem';

// interface NavContextType {
//   activeMenu: string | null;
//   isMobileMenuOpen: boolean;
//   setMobileMenuOpen: (isOpen: boolean) => void;
// }

// const NavContext = createContext<NavContextType | undefined>(undefined);

// export function NavProvider({ children }: { children: ReactNode }): React.ReactElement {
//   const pathname = usePathname();
//   const [activeMenu, setActiveMenu] = useState<string | null>(null);
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

//   // I decided to automatically update the activeMenu based on the current route
//   useEffect(() => {
//     const matchingMenuItem = menuItems.find(item => 
//       pathname.startsWith(item.href) || pathname === item.href
//     );
//     setActiveMenu(matchingMenuItem?.id || null);
//   }, [pathname]);

//   return (
//     <NavContext.Provider
//       value={{
//         activeMenu,
//         isMobileMenuOpen,
//         setMobileMenuOpen
//       }}
//     >
//       {children}
//     </NavContext.Provider>
//   );
// }

// export function useNav(): NavContextType {
//   const context = useContext(NavContext);
//   if (!context) {
//     throw new Error('useNav must be used within a NavProvider');
//   }
//   return context;
// }


// hooks/useActiveMenu.ts

'use client';

import { usePathname } from 'next/navigation';
import { menuItems } from '../utills/menuItem';
import {MenuItem} from '../types/menuTypes';

export function useActiveMenu(): string {
  const pathname = usePathname();
  
  const matchingItem = menuItems.find((item: MenuItem) => 
    pathname === item.href || pathname.startsWith(item.href)
  );
  
  return matchingItem?.id || 'menu-item-1'; 
}