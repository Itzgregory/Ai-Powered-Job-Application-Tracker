'use client';

import { DesktopNav } from './menuDesktop';
import { MobileNav } from './menuMobile';

export function NavWrapper() {
  return (
    <header className="shadow-sm w-full">
      <div className="max-w-full mx-auto px-0 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4 w-full">
          <DesktopNav />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}