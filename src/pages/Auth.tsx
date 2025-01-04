import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
      setIsLoading(false);
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticating(false);
        navigate("/");
        toast({
          title: "Welcome!",
          description: `Successfully signed in as ${session.user.email}`,
        });
      }
      if (event === 'USER_UPDATED') {
        setError(null);
        setIsAuthenticating(false);
      }
      if (event === 'SIGNED_OUT') {
        setIsAuthenticating(false);
      }
    });

    const errorMessage = searchParams.get('error');
    if (errorMessage) {
      const decodedError = decodeURIComponent(errorMessage);
      setError(decodedError);
      setIsAuthenticating(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const siteUrl = window.location.origin;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
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
              style: {
                button: { 
                  borderRadius: '0.375rem',
                  height: '2.5rem',
                  opacity: isAuthenticating ? '0.7' : '1',
                  cursor: isAuthenticating ? 'not-allowed' : 'pointer',
                },
                anchor: { 
                  color: '#2563eb',
                  textDecoration: 'none',
                },
                message: {
                  color: '#ef4444',
                  marginBottom: '1rem',
                },
                container: {
                  gap: '1rem',
                },
                divider: {
                  margin: '1.5rem 0',
                },
                label: {
                  marginBottom: '0.5rem',
                  color: '#374151',
                },
                input: {
                  borderRadius: '0.375rem',
                  borderColor: '#e5e7eb',
                  padding: '0.75rem',
                },
              },
            }}
            providers={["google"]}
            redirectTo={`${siteUrl}/auth/callback`}
            theme="light"
            localization={{
              variables: {
                sign_in: {
                  email_input_placeholder: "Your email address",
                  password_input_placeholder: "Your password",
                  email_label: "Email",
                  password_label: "Password",
                  button_label: isAuthenticating ? "Signing in..." : "Sign in",
                  loading_button_label: "Signing in ...",
                  social_provider_text: "Sign in with {{provider}}",
                  link_text: "Already have an account? Sign in",
                },
                sign_up: {
                  email_input_placeholder: "Your email address",
                  password_input_placeholder: "Create a password",
                  email_label: "Email",
                  password_label: "Password",
                  button_label: isAuthenticating ? "Creating account..." : "Create account",
                  loading_button_label: "Creating account...",
                  social_provider_text: "Sign up with {{provider}}",
                  link_text: "Don't have an account? Sign up",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;