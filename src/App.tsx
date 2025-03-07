import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthStateManager from "./components/auth/AuthStateManager";
import AppRoutes from "./components/routing/AppRoutes";
import ChatBot from "./components/ChatBot";
import { AdminProvider } from "./contexts/AdminContext";
import { motion, AnimatePresence } from "framer-motion";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
      meta: {
        errorHandler: (error: any) => {
          console.error('Query error:', error);
        },
      },
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <AdminProvider>
          <TooltipProvider>
            <ErrorBoundary>
              <Toaster />
              <Sonner />
              <AuthStateManager queryClient={queryClient} />
              <div className="min-h-screen bg-background">
                <Navbar />
                <AnimatePresence mode="wait">
                  <motion.main
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="pt-16"
                  >
                    <AppRoutes />
                  </motion.main>
                </AnimatePresence>
                <div className="fixed bottom-4 right-4 z-50">
                  <ChatBot />
                </div>
              </div>
            </ErrorBoundary>
          </TooltipProvider>
        </AdminProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;