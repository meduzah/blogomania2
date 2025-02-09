"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const randomRange = (min, max) => Math.random() * (max - min) + min;

const BlogBubbles = () => {
    const containerRef = useRef(null);

    const [blogs, setBlogs] = useState([]);
    const [positions, setPositions] = useState([]);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    //  Wczytujemy blogi z localStorage
    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem("myData")) || [];
        setBlogs(storedBlogs);
    }, []);


    useEffect(() => {
        if (containerRef.current) {
            const { offsetWidth, offsetHeight } = containerRef.current;
            setContainerSize({ width: offsetWidth, height: offsetHeight });
        }
    }, [blogs]);


    useEffect(() => {
        if (blogs.length && containerSize.width && containerSize.height) {
            const newPositions = blogs.map(() => ({
                x: randomRange(50, containerSize.width - 100),
                y: randomRange(50, containerSize.height - 100),
                vx: randomRange(-1, 1),
                vy: randomRange(-1, 1),
            }));
            setPositions(newPositions);
        }
    }, [blogs, containerSize]);

    // sledzenie kursora
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);


    useEffect(() => {
        let animationFrame;

        const animate = () => {
            setPositions((prev) =>
                prev.map((bubble) => {
                    let { x, y, vx, vy } = bubble;


                    x += vx;
                    y += vy;


                    if (x < 0 || x > containerSize.width - 80) vx = -vx;
                    if (y < 0 || y > containerSize.height - 80) vy = -vy;


                    const distX = x - mousePos.x;
                    const distY = y - mousePos.y;
                    const dist = Math.sqrt(distX * distX + distY * distY);
                    if (dist < 100) {
                        const force = (100 - dist) / 100;
                        vx += (distX / dist) * force * 0.3;
                        vy += (distY / dist) * force * 0.3;
                    }

                    return { x, y, vx, vy };
                })
            );
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [mousePos, containerSize]);


    const handleBubbleClick = (index) => {
        setPositions((prev) => {
            const updated = [...prev];
            // np. nadajemy szybszą (losową) prędkość w obu osiach
            updated[index].vx = randomRange(-4, 4);
            updated[index].vy = randomRange(-4, 4);
            return updated;
        });
    };

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden">
            {blogs.map((blog, i) => {
                const { x, y } = positions[i] || { x: 0, y: 0 };

                return (
                    <motion.div
                        key={blog.id || i}
                        className="absolute bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                       text-white font-bold rounded-full shadow-lg
                       flex items-center justify-center
                       w-20 h-20"
                        style={{
                            left: x,
                            top: y,
                            cursor: "pointer", // żeby widać było, że można kliknąć
                        }}
                        whileHover={{ scale: 1.1 }}

                        onClick={() => handleBubbleClick(i)}
                    >
                        {blog.image ? (
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <span className="text-center px-2 text-sm">
                {blog.title || "Brak tytułu"}
              </span>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default BlogBubbles;
