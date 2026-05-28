import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import AllWork from "@/pages/AllWork";
import Books from "@/pages/Books";
import Objects from "@/pages/Objects";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<AllWork />} />
          <Route path="/books" element={<Books />} />
          <Route path="/objects" element={<Objects />} />
          {/* Backwards-compatible aliases */}
          <Route path="/portfolio" element={<AllWork />} />
          <Route path="/shop" element={<Objects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
