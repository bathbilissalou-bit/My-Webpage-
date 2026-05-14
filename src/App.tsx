import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LangProvider } from "@/i18n/LangContext";
import { ImageViewerProvider } from "@/context/ImageViewerContext";
import { ConfiguratorProvider } from "@/context/ConfiguratorContext";
import Home from "@/pages/Home";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <ImageViewerProvider>
          <ConfiguratorProvider>
            <Home />
          </ConfiguratorProvider>
        </ImageViewerProvider>
      </LangProvider>
    </QueryClientProvider>
  );
}
