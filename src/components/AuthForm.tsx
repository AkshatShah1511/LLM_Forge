
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Github, LogIn, User, Mail, Lock, ArrowRight, Google } from 'lucide-react';
import { cn } from '@/lib/utils';

type AuthMode = 'signin' | 'signup';

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate fields
    if (!email || !password || (mode === 'signup' && !name)) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Submit form - this would connect to your auth provider
    toast({
      title: mode === 'signin' ? "Signing in" : "Account created",
      description: "Processing your request...",
    });
    
    // Reset form (in a real app, this would happen after successful authentication)
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSocialAuth = (provider: 'github' | 'google') => {
    toast({
      title: `Signing in with ${provider}`,
      description: "Redirecting to authentication provider...",
    });
    // In a real app, this would redirect to the OAuth provider
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="w-full max-w-md px-8 py-10 glass-card animate-fade-in">
      <div className="mb-8 text-center">
        <div className="inline-block p-3 mb-4 rounded-full bg-purple-600/20">
          <User className="w-6 h-6 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-muted-foreground">
          {mode === 'signin' 
            ? 'Sign in to continue to your account' 
            : 'Sign up to get started with your new account'}
        </p>
      </div>
      
      <div className="space-y-4 mb-6">
        <button 
          className="social-btn"
          onClick={() => handleSocialAuth('github')}
        >
          <Github className="w-5 h-5 text-purple-600" />
          <span>Continue with GitHub</span>
        </button>
        
        <button 
          className="social-btn"
          onClick={() => handleSocialAuth('google')}
        >
          <Google className="w-5 h-5 text-purple-600" />
          <span>Continue with Google</span>
        </button>
      </div>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input pl-10"
                placeholder="John Doe"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-purple-600" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input pl-10"
              placeholder="name@example.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            {mode === 'signin' && (
              <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-500">
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-purple-600" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input pl-10"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <button type="submit" className="auth-btn mt-6 group">
          <span className="flex items-center justify-center">
            {mode === 'signin' ? (
              <>
                Sign In
                <LogIn className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm">
        {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
        <button 
          type="button"
          onClick={toggleMode}
          className="ml-1 font-medium text-purple-600 hover:text-purple-500"
        >
          {mode === 'signin' ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
