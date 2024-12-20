import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const AuthPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/");
        toast({
          title: "Welcome!",
          description: "Successfully signed in",
        });
      }
      if (event === 'USER_DELETED' || event === 'SIGNED_OUT') {
        navigate("/auth");
      }
    });

    // Check for any error messages in URL
    const params = new URLSearchParams(window.location.search);
    const errorMessage = params.get('error_description');
    if (errorMessage) {
      setError(decodeURIComponent(errorMessage));
      // Clear the error from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="container max-w-md mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Welcome to Soundmaster</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          theme="light"
          onError={(error) => {
            setError(error.message);
            toast({
              variant: "destructive",
              title: "Authentication Error",
              description: error.message,
            });
          }}
        />
      </div>
    </div>
  );
};

export default AuthPage;