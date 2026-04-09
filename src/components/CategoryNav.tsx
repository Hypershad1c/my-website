"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function CategoryNav({ categories }: { categories: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 1. The Trigger Icon - Changed to white/gray to show on dark bg */}
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-[#111] rounded-full transition"
      >
        <Menu size={24} className="text-gray-300" />
      </button>

      {/* 2. Overlay Background - darker blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 3. The Sidebar Panel - Updated to #0a0a0a */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-[#0a0a0a] border-r border-[#222] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-8 flex flex-col h-full font-mono">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500">Categories</h2>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <X size={20} className="text-gray-500 hover:text-white" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="text-sm text-white hover:text-blue-400 transition-colors tracking-wide"
            >
              ALL_PRODUCTS
            </Link>
            
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                onClick={() => setIsOpen(false)}
                className="text-sm text-gray-400 hover:text-white transition-colors tracking-wide uppercase"
              >
                {category.name.replace(/\s+/g, '_')}
              </Link>
            ))}
          </nav>

          {/* Footer of Sidebar */}
          <div className="mt-auto pt-8 border-t border-[#111]">
            <p className="text-[10px] text-gray-600 tracking-widest uppercase">
              © 2026 ZeroLag Labs
            </p>
          </div>
        </div>
      </div>
    </>
  );
}