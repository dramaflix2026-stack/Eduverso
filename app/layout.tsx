import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Eduverso | Seu universo de aprendizado", description: "Aprenda e ensine com experiências visuais e inteligência artificial.", icons: { icon: [{ url: "/icon.svg?v=2", type: "image/svg+xml" }], shortcut: "/icon.svg?v=2", apple: "/icon.svg?v=2" } };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body>{children}</body></html>; }
