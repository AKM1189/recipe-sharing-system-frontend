import { Navbar } from "@/components/layout/Navbar";
import PopularTags from "./popularTags";
import Footer from "./footer";
import AuthProvider from "../providers/auth.provider";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthProvider>
        <div className="mx-5 sm:mx-10 md:mx-20">
          <Navbar />
        </div>
        <section>{children}</section>
        <div>
          <PopularTags />
        </div>
        <Footer />
      </AuthProvider>
    </div>
  );
}
