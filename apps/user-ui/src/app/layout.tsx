import "./global.css";
import Header from "./shared/widget/header/Header";
import { Poppins, Roboto } from "next/font/google";

// metadata
export const metadata = {
  title: "Trinet Ecommerce website",
  description: "Trinet Ecommerce website",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "900"],
  variable: "--font-roboto",
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
