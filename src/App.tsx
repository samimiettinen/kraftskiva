import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LegacyGame from "./pages/LegacyGame";
import Information from "./pages/Information";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/maaottelu"
            element={
              <>
                <a
                  className="fixed bottom-3 left-3 z-50 bg-white text-slate-800 rounded px-4 py-2 shadow"
                  href="/"
                >
                  ← Laulukirja
                </a>
                <LegacyGame />
              </>
            }
          />
          {(["tietosuoja", "tekoalyn-kaytto", "lahteet-ja-oikeudet", "yhteydenotto"] as const).map(page => <Route key={page} path={`/${page}`} element={<Information page={page}/>}/>)}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
