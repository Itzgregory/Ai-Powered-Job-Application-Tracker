'use client';
import Link from 'next/link';
import { menuItems } from '../utills/menuItem';
import { useActiveMenu } from '../hooks/useActiveMenu';

export function DesktopNav() {
  const activeMenu = useActiveMenu();
  const regularItems = menuItems.slice(0, -2); 
  const lastTwoItems = menuItems.slice(-2);

  return (
    <nav className="hidden lg:flex items-center justify-between w-full max-w-full mx-0 px-0">
      <div className="flex gap-2">
        {regularItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`
              px-4 py-2 text-sm font-medium transition-colors
              text-[var(--button-color)] rounded-md 
              hover:bg-[var(--button-color-hover)] hover:text-[var(--button-text)]
              ${activeMenu === item.id ? 'font-bold text-[var(--button-text)] bg-[var(--button-color-hover)]' : ''}
            `}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="flex gap-2">
        {lastTwoItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            id={item.id}
            className={`
              px-4 py-2 text-sm font-medium transition-colors
              bg-[var(--primary-color)] text-[var(--button-text)] 
              rounded-md
              hover:bg-[var(--primary-hover)] hover:text-[var(--primary-color)]
              ${activeMenu === item.id ? 'font-bold bg-[var(--primary-hover)]' : ''}
            `}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </nav>
  );
}