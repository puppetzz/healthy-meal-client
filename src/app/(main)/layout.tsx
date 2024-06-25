import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/nav/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </>
  );
}
