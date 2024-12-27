import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import Auth from "@/pages/Auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProfileEditor from "@/components/ProfileEditor";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } 
      />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileEditor />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;