import "./globals.css";

export const metadata = {
  title: "Auto System",
  description: "Financial Reporting Made Easy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
