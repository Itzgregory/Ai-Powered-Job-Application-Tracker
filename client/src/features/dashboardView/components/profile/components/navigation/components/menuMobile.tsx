'use client';
import { useState } from 'react';
import Link from 'next/link';
import { menuItems } from '../utills/menuItem';
import { useActiveMenu } from '../hooks/useActiveMenu';
import { Menu, X } from 'lucide-react';

export function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);
    const activeMenu = useActiveMenu();
  
    return (
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
  
        {isOpen && (
          <div className="absolute left-0 right-0 top-16 bg-white shadow-lg z-50 animate-in fade-in">
            <nav className="px-4 py-3">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        activeMenu === item.id
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    );
  }