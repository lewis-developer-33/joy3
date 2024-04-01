
import "../globals.css";
import AdminLayout from "../adminLayout";

export const metadata = {
  title: "RBS"
};

export default function RootLayout({ children }) {
  return (
    <AdminLayout>
        {children}
    </AdminLayout>
  );
}
