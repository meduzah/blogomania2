"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/Components/Navbar";

const CreateBlog = () => {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [blogs, setBlogs] = useState([]);


    const pasteRef = useRef(null);

    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem("myData") || "[]");
        setBlogs(storedBlogs);
    }, []);

    // zapisywanie formularza
    const handleSubmit = () => {
        const newBlog = {
            id: blogs.length + 1,
            author,
            title,
            description,
            imageUrl,
            date: new Date().toLocaleDateString(),
        };

        const updatedBlogs = [...blogs, newBlog];
        setBlogs(updatedBlogs);
        localStorage.setItem("myData", JSON.stringify(updatedBlogs));


        setAuthor("");
        setTitle("");
        setDescription("");
        setImageUrl("");
    };


    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // konwercja plikudo base64
        const reader = new FileReader();
        reader.onload = (event) => {
            setImageUrl(event.target.result); // np. data:image/png;base64,...
        };
        reader.readAsDataURL(file);
    };

    // ctrl v
    const handlePaste = (e) => {
        // czy w srodku juz sa pliki
        const items = e.clipboardData?.items || [];
        for (const item of items) {
            if (item.kind === "file") {
                const file = item.getAsFile();
                if (file) {
                    // Konwertujemy wklejony obraz do base64
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        setImageUrl(ev.target.result);
                    };
                    reader.readAsDataURL(file);

                    e.preventDefault();
                    return;
                }
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-24 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Stwórz Nowy Blog</h2>

                <input
                    type="text"
                    placeholder="Autor"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />

                <input
                    type="text"
                    placeholder="Tytuł"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />

                <textarea
                    placeholder="Opis"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />

                <input
                    type="text"
                    placeholder="URL Zdjęcia (opcjonalnie)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-2 mb-3 border rounded"
                />


                <div className="mb-3">
                    <label className="block mb-1 font-medium">Załaduj obraz z pliku:</label>
                    <input type="file" onChange={handleFileChange} />
                </div>

                {/* Pole do wklejania obrazków ze schowka */}
                <div className="mb-3">
                    <label className="block mb-1 font-medium">
                        Wklej obraz (Ctrl+V) tutaj:
                    </label>
                    <div
                        ref={pasteRef}
                        onPaste={handlePaste}
                        className="w-full p-2 border rounded h-24"
                        contentEditable={true}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Dodaj Blog
                </button>
            </div>
        </div>
    );
};

export default CreateBlog;
