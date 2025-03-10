
import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Package, Download, Star, Tag, Filter } from 'lucide-react';

const MarketplacePage = () => {
  const marketplaceItems = [
    { 
      id: 1, 
      name: 'Analytics Dashboard', 
      description: 'Comprehensive analytics dashboard template with charts and data visualization components.',
      price: 25,
      tags: ['Dashboard', 'Analytics'],
      rating: 4.8,
      downloads: 1250
    },
    { 
      id: 2, 
      name: 'E-commerce Template', 
      description: 'Complete e-commerce solution with product listings, cart, and checkout flow.',
      price: 35,
      tags: ['E-commerce', 'Shop'],
      rating: 4.6,
      downloads: 983
    },
    { 
      id: 3, 
      name: 'Landing Page Builder', 
      description: 'Drag and drop landing page builder with conversion optimization features.',
      price: 15,
      tags: ['Landing', 'Marketing'],
      rating: 4.7,
      downloads: 1578
    },
    { 
      id: 4, 
      name: 'Authentication System', 
      description: 'Secure authentication system with social login and two-factor authentication.',
      price: 20,
      tags: ['Auth', 'Security'],
      rating: 4.9,
      downloads: 2100
    },
  ];
  
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Marketplace</h1>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="w-64 p-2 pr-8 bg-background border rounded-md"
                />
                <span className="absolute right-2 top-2 text-muted-foreground">
                  <Package className="h-4 w-4" />
                </span>
              </div>
              
              <button className="p-2 bg-card border rounded-md text-muted-foreground hover:text-foreground transition-colors">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceItems.map((item) => (
              <div key={item.id} className="bg-card rounded-lg overflow-hidden border hover:shadow-md transition-shadow">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                  <Package className="h-16 w-16 text-white opacity-75" />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm">{item.rating}</span>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Download className="h-4 w-4 mr-1" />
                      {item.downloads}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-purple-600/10 text-purple-600 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">{item.price} credits</span>
                    <button className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                      Purchase
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketplacePage;
