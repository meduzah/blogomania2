import Link from "next/link";

export default function BlogCard({ blog }) {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            {/*  Obrazek bloga */}
            {blog.imageUrl && (
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
            )}

            {/* Treść bloga */}
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900">{blog.title}</h2>
                <p className="text-gray-600 text-sm">Autor: {blog.author} • {blog.date}</p>
                <p className="text-gray-700 mt-3">{blog.description.substring(0, 100)}...</p>

                {/* Przycisk "Czytaj więcej" */}
                <Link href={`/blog/${blog.id}`} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Czytaj więcej →
                </Link>
            </div>
        </div>
    );
}
