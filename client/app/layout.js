
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"


export const metadata = {
  title: "RBS"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
