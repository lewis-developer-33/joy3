
import "../globals.css";

export const metadata = {
  title: "RBS"
};

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
        {children}
    </div>
  );
}
