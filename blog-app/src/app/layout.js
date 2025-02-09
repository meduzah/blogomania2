import "./globals.css";
import Navbar from "@/Components/Navbar";

export const metadata = {
    title: "BLOGOMANIA",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="m-0 p-0 w-screen h-screen overflow-hidden">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body
            className="
          m-0 p-0
          w-screen h-screen
          overflow-hidden
          flex flex-col
          bg-gradient-to-r from-green-400 to-blue-500
          text-gray-900
        "
        >
        {/* Górny pasek */}
        <Navbar />

        {/* Główna zawartość, zajmuje resztę ekranu */}
        <div className="relative flex-1 overflow-hidden">
            {children}
        </div>

        </body>
        </html>
    );
}
