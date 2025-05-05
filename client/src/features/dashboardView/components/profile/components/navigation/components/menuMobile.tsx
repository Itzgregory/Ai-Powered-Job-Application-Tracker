'use client';
import Link from 'next/link';
import { menuItems } from '../utills/menuItem';
import { useActiveMenu } from '../hooks/useActiveMenu';

export function MobileNav() {
  const activeMenu = useActiveMenu();
  const regularItems = menuItems.slice(0, -2); 
  const lastTwoItems = menuItems.slice(-2); 

  return (
    <div className="lg:hidden w-full max-w-full mx-0 px-0">
      <div className="relative">
        <div className="flex overflow-x-auto pb-2 hide-scrollbar gap-2 px-0 w-full">
          {regularItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex-shrink-0 px-4 py-2 text-sm font-medium transition-colors
                border border-[var(--button-color)] rounded-md
                text-[var(--button-color)] 
                hover:bg-[var(--hover-color)] hover:text-[var(--button-text)]
                ${activeMenu === item.id ? 'font-bold underline text-[ --button-text] bg-[var(--hover-color)]' : ''}
              `}
            >
              {item.title}
            </Link>
          ))}
          <div className="flex-grow"></div>
          <div className="flex gap-2 flex-shrink-0">
            {lastTwoItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                id={item.id}
                className={`
                  flex-shrink-0 px-4 py-2 text-sm font-medium transition-colors
                  border border-[var(--primary-color)] rounded-md
                  bg-[var(--primary-color)] text-[var(--button-text)] 
                  hover:bg-[var(--primary-hover)] hover:text-[var(--primary-color)]
                  ${activeMenu === item.id ? 'font-bold bg-[var(--primary-hover)]' : ''}
                `}
              >
                {item.title}
            </Link>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 opacity-30"></div>
      </div>
    </div>
  );
}