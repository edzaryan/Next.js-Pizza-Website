import "./globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="font-nunito" suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
