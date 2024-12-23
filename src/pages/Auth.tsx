import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate("/");
        toast({
          title: "Welcome!",
          description: `Successfully signed in as ${session.user.email}`,
        });
      }
    });

    const errorMessage = searchParams.get('error');
    if (errorMessage) {
      const decodedError = decodeURIComponent(errorMessage);
      setError(decodedError);
      window.history.replaceState({}, document.title, window.location.pathname);
      
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: decodedError,
      });
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Welcome to Soundmaster
          </h2>
          <SupabaseAuth 
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8',
                  },
                },
              },
            }}
            providers={["google"]}
            theme="light"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;