
import React, { useState } from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Edit2, Check, Camera, Mail, UserRound, Badge } from 'lucide-react';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { user, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    
    updateProfile({ name, email });
    setIsEditing(false);
  };
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>
          
          <div className="bg-card shadow-sm rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 h-32 w-full relative">
              <div className="absolute -bottom-12 left-8">
                <div className="h-24 w-24 rounded-full bg-purple-600/20 border-4 border-background flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {user?.name.charAt(0) || 'U'}
                  </span>
                  <button className="absolute right-0 bottom-0 p-1 bg-purple-700 rounded-full text-white hover:bg-purple-800 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="absolute right-4 top-4">
                {isEditing ? (
                  <button 
                    onClick={handleSave}
                    className="p-2 rounded-full bg-white text-purple-600 hover:bg-gray-100 transition-colors"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="p-2 rounded-full bg-white text-purple-600 hover:bg-gray-100 transition-colors"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-8 mt-12">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-medium text-muted-foreground mb-1">
                      <UserRound className="h-4 w-4 mr-2" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 bg-background border rounded-md"
                      />
                    ) : (
                      <p className="text-lg font-medium">{user?.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="flex items-center text-sm font-medium text-muted-foreground mb-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 bg-background border rounded-md"
                      />
                    ) : (
                      <p className="text-lg">{user?.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="flex items-center text-sm font-medium text-muted-foreground mb-1">
                      <Badge className="h-4 w-4 mr-2" />
                      Role
                    </label>
                    <p className="text-lg capitalize">{user?.role}</p>
                  </div>
                  
                  <div>
                    <label className="flex items-center text-sm font-medium text-muted-foreground mb-1">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Available Credits
                    </label>
                    <p className="text-lg font-bold text-purple-600">{user?.credits}</p>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center text-sm font-medium text-muted-foreground mb-1">
                    Member Since
                  </label>
                  <p className="text-lg">
                    {user?.createdAt instanceof Date 
                      ? user.createdAt.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : new Date(user?.createdAt || '').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
