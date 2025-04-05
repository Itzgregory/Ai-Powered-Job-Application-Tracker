import { ReactNode } from "react";
import Header from "@/components/view/header/Header";
import Footer from "@/components/view/footer/Footer";
import { Providers } from "@/redux/store/providers";
import "@/styles/globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main style={{ paddingTop: "4rem" }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}