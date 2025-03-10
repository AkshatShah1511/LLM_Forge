
import React from 'react';

const AuthBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Main gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-background to-background"></div>
      
      {/* Animated blur circles */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-3xl animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 backdrop-blur-[100px] bg-grid-white/[0.02] bg-[length:50px_50px]"></div>
    </div>
  );
};

export default AuthBackground;
