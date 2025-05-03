'use client';

import { DesktopNav } from './menuDesktop';
import { MobileNav } from './menuMobile';

export function NavWrapper() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <DesktopNav />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}