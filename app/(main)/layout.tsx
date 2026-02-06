import { Navbar } from "@/components/layout/Navbar";
import PopularTags from "./popularTags";
import Footer from "./footer";
import AuthProvider from "../providers/auth.provider";
import LoginModal from "@/components/common/LoginModal";
import ConfirmPopup from "@/components/common/ConfirmPopup";
import Loading from "@/components/common/Loading";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthProvider>
        <div className="mx-5 sm:mx-10 md:mx-10">
          <Navbar />
        </div>
        <section className="mx-20">{children}</section>
        <div>
          <PopularTags />
        </div>
        <Footer />
        <LoginModal />
        <ConfirmPopup />
        <Loading />
      </AuthProvider>
    </div>
  );
}
