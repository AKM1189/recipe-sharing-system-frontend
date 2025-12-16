import { Navbar } from "@/components/layout/Navbar";
import PopularTags from "./popularTags";
import Footer from "./footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="mx-20">
        <Navbar />
      </div>
      <section>{children}</section>
      <div>
        <PopularTags />
      </div>
      <Footer />
    </div>
  );
}
