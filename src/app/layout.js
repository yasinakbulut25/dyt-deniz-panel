import { Montserrat } from "next/font/google";
import "../styles/index.css";
import ClientProvider from "./ClientProvider";
import Main from "./main";
import { ToastMessage } from "@/components/toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const LANDING_BASE_URL = process.env.NEXT_PUBLIC_LANDING_URL;

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="html-content !p-0 no-scrollbar">
      <head>
        <title>Yönetim Paneli</title>
      </head>
      <body className={`${montserrat.className} antialiased`}>
        <ToastMessage />
        <ClientProvider>
          <Main>{children}</Main>
        </ClientProvider>
      </body>
    </html>
  );
}
