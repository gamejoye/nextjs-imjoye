import { App } from "@/component/App";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'IMJoye',
  description: 'IMJoye online chat',
  icons: ['/logo.png'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ padding: 0, margin: 0 }}>
        <App>
          {children}
        </App>
      </body>
    </html>
  );
}
