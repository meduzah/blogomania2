"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

function BlogList() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const blogs = JSON.parse(localStorage.getItem("myData") || "[]");
        setData(blogs);
    }, []);

    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6 pt-1300">
            {/*  Wyszukiwarka111 */}
            <input
                type="text"
                className="w-full p-3 mb-6 border rounded-lg"
                placeholder="Wyszukaj blog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Grid dla kart */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                            {/*  Obrazek */}
                            {item.imageUrl && (
                                <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                            )}

                            {/*  Treść bloga */}
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
                                <p className="text-gray-600 text-sm mb-2">Autor: {item.author} • {item.date}</p>
                                <p className="text-gray-700">{item.description.substring(0, 100)}...</p>

                                {/*  Przycisk "Czytaj więcej" */}
                                <Link href={`/blog/${item.id}`}>
                                    <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                        Czytaj więcej →
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">Brak wpisów na blogu. Dodaj pierwszy!</p>
                )}
            </div>
        </div>
    );
}

export default BlogList;
