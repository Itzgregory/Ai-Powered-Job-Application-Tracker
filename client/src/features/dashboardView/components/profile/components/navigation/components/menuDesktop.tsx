'use client';
import Link from 'next/link';
import { menuItems } from '../utills/menuItem';
import { useActiveMenu } from '../hooks/useActiveMenu';

export function DesktopNav() {
  const activeMenu = useActiveMenu();

  return (
    <nav className="hidden md:block">
      <ul className="flex gap-6">
        {menuItems.map((item) => (
          <li key={item.id} className="relative">
            <Link
              href={item.href}
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                activeMenu === item.id ? 'text-primary font-medium' : ''
              }`}
            >
              {item.title}
              {activeMenu === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-all duration-300" />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}