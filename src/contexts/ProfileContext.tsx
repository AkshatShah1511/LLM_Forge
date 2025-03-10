
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/user';
import { toast } from 'sonner';

interface ProfileContextType {
  user: User | null;
  updateProfile: (data: Partial<User>) => void;
  updateAvatar: (avatar: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Create a default user if none exists
      const defaultUser: User = {
        id: '1',
        name: 'Demo User',
        email: 'user@example.com',
        role: 'user',
        credits: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setUser(defaultUser);
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }
  }, []);

  // Save user to localStorage when they change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      ...data,
      updatedAt: new Date()
    };
    
    setUser(updatedUser);
    toast.success("Profile updated successfully");
  };

  const updateAvatar = (avatar: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      avatar,
      updatedAt: new Date()
    };
    
    setUser(updatedUser);
    toast.success("Avatar updated successfully");
  };

  return (
    <ProfileContext.Provider 
      value={{
        user,
        updateProfile,
        updateAvatar
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
