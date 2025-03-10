
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useProfile } from '@/contexts/ProfileContext';
import { CreditCard, Plus, BarChart, Activity, Clock, RefreshCw } from 'lucide-react';

const CreditsPage = () => {
  const { user } = useProfile();
  
  // Mock transaction history
  const transactions = [
    { id: 1, type: 'purchase', amount: 50, description: 'Credit package purchase', date: '2023-09-15' },
    { id: 2, type: 'usage', amount: -5, description: 'E-commerce Template', date: '2023-09-16' },
    { id: 3, type: 'usage', amount: -10, description: 'API usage for Project X', date: '2023-09-18' },
    { id: 4, type: 'bonus', amount: 25, description: 'Referral bonus', date: '2023-09-20' },
    { id: 5, type: 'usage', amount: -15, description: 'Analytics Dashboard', date: '2023-09-22' },
  ];
  
  const creditPackages = [
    { id: 1, amount: 100, price: 10, popular: false },
    { id: 2, amount: 500, price: 45, popular: true },
    { id: 3, amount: 1000, price: 80, popular: false },
  ];
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Credits</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-lg p-6 border col-span-1">
              <h2 className="text-lg font-medium mb-6">Available Credits</h2>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center mr-4">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <span className="text-3xl font-bold">{user?.credits || 0}</span>
                  <p className="text-muted-foreground">Current balance</p>
                </div>
              </div>
              <button className="w-full mt-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center">
                <Plus className="h-4 w-4 mr-2" />
                Add More Credits
              </button>
            </div>
            
            <div className="bg-card rounded-lg p-6 border col-span-1 lg:col-span-2">
              <h2 className="text-lg font-medium mb-4">Credit Usage Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <BarChart className="h-4 w-4 text-purple-600 mr-2" />
                    <span className="text-sm text-muted-foreground">Monthly Usage</span>
                  </div>
                  <span className="text-2xl font-bold">45</span>
                </div>
                <div className="bg-background rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <Activity className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-muted-foreground">Usage Trend</span>
                  </div>
                  <span className="text-2xl font-bold">+12%</span>
                </div>
                <div className="bg-background rounded-md p-4">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm text-muted-foreground">Avg Daily Usage</span>
                  </div>
                  <span className="text-2xl font-bold">1.5</span>
                </div>
              </div>
              <div className="h-48 mt-4 flex items-center justify-center bg-background/50 rounded-md">
                <span className="text-muted-foreground">Usage chart will appear here</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {creditPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`bg-card rounded-lg p-6 border relative ${pkg.popular ? 'ring-2 ring-purple-600' : ''}`}
              >
                {pkg.popular && (
                  <span className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                    Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{pkg.amount} Credits</h3>
                <p className="text-muted-foreground mb-4">Perfect for small to medium projects</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">${pkg.price}</span>
                  <span className="text-muted-foreground">/one-time</span>
                </div>
                <button className={`w-full py-2 rounded-md transition-colors ${
                  pkg.popular 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'bg-background hover:bg-background/80'
                }`}>
                  Purchase
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Transaction History</h2>
                <button className="text-sm text-purple-600 flex items-center">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Refresh
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground text-sm">
                      <th className="pb-2">Description</th>
                      <th className="pb-2">Date</th>
                      <th className="pb-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} className="border-t">
                        <td className="py-3">{tx.description}</td>
                        <td className="py-3 text-muted-foreground">
                          {new Date(tx.date).toLocaleDateString()}
                        </td>
                        <td className={`py-3 text-right font-medium ${
                          tx.amount > 0 ? 'text-green-600' : ''
                        }`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreditsPage;
