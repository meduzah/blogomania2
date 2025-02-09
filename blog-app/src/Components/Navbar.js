"use client";  // 🚀 Dodaj to tutaj

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 fixed w-full z-50 top-0 left-0 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* ✨ BLOGOMANIA - Klikalne logo */}
                <Link href="/" className="text-white font-extrabold text-3xl tracking-wide hover:scale-105 transition">
                    BLOGOMANIA
                </Link>

                {/* 🌟 Menu nawigacyjne (Desktop) */}
                <div className="hidden md:flex space-x-6">
                    <Link href="/blog" className="text-white hover:text-yellow-300 transition font-medium">
                        Blog
                    </Link>
                    <Link href="/createblog" className="text-white hover:text-yellow-300 transition font-medium">
                        Create Blog
                    </Link>
                </div>

                {/* ⚪ Przycisk CTA */}
                <Link href="/createblog">
                    <button className="bg-white text-gray-800 font-medium px-5 py-2 rounded-full shadow-md transition hover:bg-gray-100 hover:shadow-lg hover:scale-105">
                        Get started
                    </button>
                </Link>

                {/* 📱 Hamburger menu (Mobile) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-white focus:outline-none"
                >
                    <span className="text-3xl">☰</span>
                </button>
            </div>

            {/* 📱 Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md p-4 flex flex-col items-center rounded-lg">
                    <Link href="/blog" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>Blog</Link>
                    <Link href="/createblog" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>Create Blog</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
