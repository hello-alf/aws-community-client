import Header from "../components/header/header";
import Main from "../components/container/main";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Header />
      <main className="max-w-md mx-auto space-y-6">
        <Main />
      </main>
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Mueve los sliders para cambiar el LED RGB color
      </footer>
    </div>
  );
}
