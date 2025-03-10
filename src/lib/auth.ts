
import React from 'react';
import { toast } from "sonner";

// Mock user type that would normally come from your database
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

// Mock auth state
let currentUser: User | null = null;

// Mock auth functions
export const auth = {
  signIn: async (provider: string): Promise<User | null> => {
    // In a real app, this would redirect to OAuth provider
    toast.info(`Signing in with ${provider}...`);
    
    // Mock successful sign in
    currentUser = {
      id: "user-1",
      name: "Demo User",
      email: "user@example.com",
      image: "/placeholder.svg"
    };
    
    localStorage.setItem("user", JSON.stringify(currentUser));
    return currentUser;
  },
  
  signOut: async (): Promise<void> => {
    currentUser = null;
    localStorage.removeItem("user");
    toast.info("Signed out successfully");
  },
  
  getSession: async (): Promise<{ user: User } | null> => {
    // Check local storage for user data
    const userData = localStorage.getItem("user");
    
    if (userData) {
      currentUser = JSON.parse(userData);
      return { user: currentUser };
    }
    
    return null;
  }
};

// Hook to get current user (would normally use NextAuth useSession)
export const useSession = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [status, setStatus] = React.useState<"loading" | "authenticated" | "unauthenticated">("loading");
  
  React.useEffect(() => {
    const loadSession = async () => {
      const session = await auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        setStatus("authenticated");
      } else {
        setStatus("unauthenticated");
      }
    };
    
    loadSession();
  }, []);
  
  return { 
    user, 
    status,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated" 
  };
};
