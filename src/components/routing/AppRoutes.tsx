import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import Admin from "@/pages/Admin";
import Auth from "@/pages/Auth";
import LiveLesson from "@/pages/LiveLesson";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/live-lesson" element={<LiveLesson />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}