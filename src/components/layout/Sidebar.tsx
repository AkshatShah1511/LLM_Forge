
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  User, 
  Store, 
  CreditCard, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Settings,
  FileDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useProfile } from '@/contexts/ProfileContext';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useProfile();
  
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Workspaces', icon: Briefcase, path: '/workspace' },
    { name: 'Profile', icon: User, path: '/profile' },
    { name: 'Marketplace', icon: Store, path: '/marketplace' },
    { name: 'Credits', icon: CreditCard, path: '/credits' },
    { name: 'Scrape Data', icon: FileDown, path: '/scrape-data' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside 
      className={cn(
        "h-screen bg-card border-r transition-all duration-300 flex flex-col",
        isCollapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && (
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">
            Scrapify
          </h2>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-full hover:bg-purple-600/10 transition-colors"
        >
          {isCollapsed ? 
            <ChevronRight className="h-5 w-5 text-muted-foreground" /> : 
            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
          }
        </button>
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex items-center w-full p-2 rounded-md transition-all duration-200",
                location.pathname === item.path
                  ? "bg-purple-600/10 text-purple-600"
                  : "text-muted-foreground hover:bg-purple-600/5 hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5",
                location.pathname === item.path ? "text-purple-600" : ""
              )} />
              {!isCollapsed && (
                <span className="ml-3">{item.name}</span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t">
        {!isCollapsed && (
          <div className="mb-4">
            <ThemeToggle />
          </div>
        )}
        {isCollapsed ? (
          <div className="flex justify-center">
            <div className="h-8 w-8 rounded-full bg-purple-600/20 flex items-center justify-center text-sm font-medium text-purple-600">
              {user?.name.charAt(0) || 'U'}
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-purple-600/20 flex items-center justify-center text-sm font-medium text-purple-600">
              {user?.name.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => navigate('/')}
          className={cn(
            "flex items-center w-full mt-2 p-2 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
            isCollapsed ? "justify-center" : ""
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
