import About from "./src/pages/About";
import Home from "./src/pages/Home";
import Contact from "./src/pages/Contact";

export default function App() {
  return (
    <main className="bg-black text-white w-full">
      <Home />
      <About />
      <Contact />
    </main>
  );
}
