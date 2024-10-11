import Image from "next/image";
import localFont from "next/font/local";
import Header from "../components/header/header";
import Main from "../components/container/main";
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Header />
      <main className="max-w-md mx-auto space-y-6">
        <Main />
      </main>
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Adjust sliders to change RGB LED color
      </footer>
    </div>
  );
}
