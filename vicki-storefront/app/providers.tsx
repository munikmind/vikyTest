"use client";
import { CartProvider } from "@/context/CartContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { RegionProvider } from "../lib/context/region-context";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RegionProvider>{children}</RegionProvider>
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}
