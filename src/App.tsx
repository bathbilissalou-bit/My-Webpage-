import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LangProvider } from "@/i18n/LangContext";
import Home from "@/pages/Home";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <Home />
      </LangProvider>
    </QueryClientProvider>
  );
}
