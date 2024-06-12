import { Navbar } from "../../components/nav/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative">
        <Navbar />
        {children}
      </div>
    </>
  );
}
