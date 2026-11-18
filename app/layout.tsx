import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Eduverso | Seu universo de aprendizado", description: "Aprenda e ensine com experiências visuais e inteligência artificial." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html>; }
