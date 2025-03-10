
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import WorkspacePage from "./pages/WorkspacePage";
import ProfilePage from "./pages/ProfilePage";
import MarketplacePage from "./pages/MarketplacePage";
import CreditsPage from "./pages/CreditsPage";
import SettingsPage from "./pages/SettingsPage";
import ScrapeDataPage from "./pages/ScrapeDataPage";
import { WorkspaceProvider } from "./contexts/WorkspaceContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { ThemeProvider } from "./contexts/ThemeContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ProfileProvider>
        <WorkspaceProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/dashboard" element={<Index />} />
                <Route path="/workspace" element={<WorkspacePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/credits" element={<CreditsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/scrape-data" element={<ScrapeDataPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </WorkspaceProvider>
      </ProfileProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
