import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/ui/Providers";
import Navbar from "@/components/ui/Navbar"; // 👈 importar

export const metadata: Metadata = {
  title: "Locadora de Carros",
  description: "Sistema de locação de carros com Next.js, MongoDB e HeroUI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>
          <Navbar /> 
          {children}
        </Providers>
      </body>
    </html>
  );
}

