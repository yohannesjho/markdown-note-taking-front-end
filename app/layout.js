import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col"
      >
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-lg font-bold">Markdown Notes</h1>
        </header>
        <main className="flex-1 p-4">{children}</main>
        <footer className="bg-gray-800 text-white text-center p-4">
          © 2024 Markdown Notes
        </footer>
      </body>
    </html>
  );
}
