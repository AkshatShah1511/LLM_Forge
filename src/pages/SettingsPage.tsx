
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { useProfile } from '@/contexts/ProfileContext';
import { Monitor, Moon, Sun, User, Globe, CreditCard } from 'lucide-react';

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useProfile();

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>
          
          <div className="space-y-8">
            <div className="bg-card shadow-sm rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-medium">Appearance</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Customize how Scrapify looks on your device
                </p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer border-2 transition-all ${theme === 'light' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-transparent hover:border-muted'}`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="h-10 w-10 rounded-full bg-background dark:bg-card flex items-center justify-center mb-2">
                      <Sun className="h-6 w-6 text-amber-500" />
                    </div>
                    <span className="font-medium">Light</span>
                  </div>
                  
                  <div 
                    className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer border-2 transition-all ${theme === 'dark' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-transparent hover:border-muted'}`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="h-10 w-10 rounded-full bg-background dark:bg-card flex items-center justify-center mb-2">
                      <Moon className="h-6 w-6 text-indigo-400" />
                    </div>
                    <span className="font-medium">Dark</span>
                  </div>
                  
                  <div 
                    className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer border-2 transition-all ${theme === 'system' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-transparent hover:border-muted'}`}
                    onClick={() => setTheme('system')}
                  >
                    <div className="h-10 w-10 rounded-full bg-background dark:bg-card flex items-center justify-center mb-2">
                      <Monitor className="h-6 w-6 text-blue-500" />
                    </div>
                    <span className="font-medium">System</span>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-medium">Quick toggle:</span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
            
            <div className="bg-card shadow-sm rounded-lg overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-medium">Regional Settings</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Configure your location and currency preferences
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="currency">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Preferred Currency
                      </div>
                    </label>
                    <select 
                      id="currency" 
                      className="w-full p-2 bg-background border rounded-md"
                      defaultValue="USD"
                    >
                      {currencies.map(currency => (
                        <option key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name} ({currency.symbol})
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Used for displaying prices and billing
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="timezone">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Timezone
                      </div>
                    </label>
                    <select 
                      id="timezone" 
                      className="w-full p-2 bg-background border rounded-md"
                      defaultValue="Etc/UTC"
                    >
                      <option value="Etc/UTC">UTC (Coordinated Universal Time)</option>
                      <option value="America/New_York">Eastern Time (US & Canada)</option>
                      <option value="America/Chicago">Central Time (US & Canada)</option>
                      <option value="America/Denver">Mountain Time (US & Canada)</option>
                      <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                      <option value="Europe/London">London, Edinburgh</option>
                      <option value="Europe/Paris">Paris, Berlin, Rome, Madrid</option>
                      <option value="Asia/Tokyo">Tokyo, Osaka</option>
                      <option value="Asia/Shanghai">Beijing, Shanghai</option>
                      <option value="Asia/Kolkata">Mumbai, New Delhi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
