
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Download, ExternalLink, FileText, Filter, RefreshCw, Search, SortDesc, Sparkles } from 'lucide-react';

const ScrapeDataPage = () => {
  const [selectedTab, setSelectedTab] = useState<'raw' | 'refined'>('raw');
  
  // Mock scraped data
  const mockScrapedData = [
    {
      id: '1',
      url: 'https://example.com/page-1',
      title: 'Example Website Homepage',
      date: new Date(2023, 5, 15),
      size: '245 KB',
      status: 'Complete'
    },
    {
      id: '2',
      url: 'https://example.com/products',
      title: 'Product Catalog',
      date: new Date(2023, 6, 3),
      size: '1.2 MB',
      status: 'Complete'
    },
    {
      id: '3',
      url: 'https://blog.example.com',
      title: 'Blog Articles',
      date: new Date(2023, 7, 22),
      size: '780 KB',
      status: 'Complete'
    },
    {
      id: '4',
      url: 'https://example.com/about',
      title: 'About Us Page',
      date: new Date(2023, 7, 25),
      size: '150 KB',
      status: 'Complete'
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Scraped Data</h1>
              <p className="text-muted-foreground mt-1">Manage and export your web scraping results</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search scraped data..."
                  className="w-64 p-2 pr-8 bg-background border rounded-md"
                />
                <span className="absolute right-2 top-2 text-muted-foreground">
                  <Search className="h-4 w-4" />
                </span>
              </div>
              
              <button className="p-2 bg-card border rounded-md text-muted-foreground hover:text-foreground transition-colors">
                <Filter className="h-4 w-4" />
              </button>
              
              <button className="p-2 bg-card border rounded-md text-muted-foreground hover:text-foreground transition-colors">
                <SortDesc className="h-4 w-4" />
              </button>
              
              <button className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="flex border-b">
              <button
                className={`flex-1 py-3 px-4 text-center font-medium ${selectedTab === 'raw' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 border-b-2 border-purple-600' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setSelectedTab('raw')}
              >
                <div className="flex items-center justify-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Raw Data
                </div>
              </button>
              <button
                className={`flex-1 py-3 px-4 text-center font-medium ${selectedTab === 'refined' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 border-b-2 border-purple-600' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setSelectedTab('refined')}
              >
                <div className="flex items-center justify-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Refined
                </div>
              </button>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Title</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">URL</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Size</th>
                      <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockScrapedData.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 text-sm">{item.title}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center">
                            <span className="truncate max-w-[200px]">{item.url}</span>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="ml-1 text-muted-foreground hover:text-foreground">
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{item.date.toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-sm">{item.size}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                            <Download className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {selectedTab === 'refined' && (
                <div className="mt-6 p-4 border rounded-md bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200">
                  <div className="flex items-start">
                    <Sparkles className="h-5 w-5 mr-2 mt-0.5" />
                    <div>
                      <p className="font-medium">AI Refinement</p>
                      <p className="text-sm mt-1">
                        AI refined data represents scraped content processed through our machine learning algorithms. 
                        This data is cleaner, better structured, and optimized for analysis compared to raw scraped data.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScrapeDataPage;
