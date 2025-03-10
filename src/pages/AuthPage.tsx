
import React from 'react';
import AuthForm from '@/components/AuthForm';
import AuthBackground from '@/components/AuthBackground';

const AuthPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <AuthBackground />
      
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
              Scrapify
            </span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Minimalist. Intuitive. Elegant.
          </p>
        </div>
        
        <AuthForm />
        
        <p className="text-center text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
