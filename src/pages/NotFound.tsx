
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthBackground from "@/components/AuthBackground";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <AuthBackground />
      
      <div className="glass-card p-8 w-full max-w-md text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/20 mb-6">
          <span className="text-2xl font-bold text-purple-600">404</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="auth-btn"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
