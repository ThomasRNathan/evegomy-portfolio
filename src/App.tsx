import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/cart/CartDrawer";
import { Cursor } from "@/components/Cursor";
import { PageTransition } from "@/components/PageTransition";
import Home from "@/pages/Home";
import AllWork from "@/pages/AllWork";
import Books from "@/pages/Books";
import Shop from "@/pages/Shop";
import Objects from "@/pages/Objects";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ProductDetail from "@/pages/ProductDetail";
import Success from "@/pages/Success";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/success" element={<Success />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
            <Route path="/work" element={<AllWork />} />
            <Route path="/books" element={<Books />} />
            <Route path="/objects" element={<Objects />} />
            <Route path="/objects/:id" element={<ProductDetail />} />
            <Route path="/portfolio" element={<AllWork />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <CartDrawer />
      <Cursor />
    </div>
  );
}
