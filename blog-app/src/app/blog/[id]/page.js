"use client";

import React from "react";
import { useParams } from "next/navigation";

const BlogPost = () => {
    const { id } = useParams();
    const blogs = JSON.parse(localStorage.getItem("myData") || "[]");
    const post = blogs.find((blog) => blog.id.toString() === id);

    if (!post) {
        return <div className="text-center text-red-500">Nie znaleziono posta!</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-600">Autor: {post.author} • {post.date}</p>


            {post.imageUrl && post.imageUrl.trim() !== "" && (
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-64 object-cover my-4 rounded-lg"
                />
            )}

            <p className="text-gray-800">{post.description}</p>
        </div>
    );
};

export default BlogPost;
