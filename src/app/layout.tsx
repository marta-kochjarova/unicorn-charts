import type { Metadata } from "next";
import './globals.css'
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import customTokens from "./AntCustomTokens";
import Provider from "./clients/Provider";

export const metadata: Metadata = {
  title: "Simple charts app",
  description: "This app was made as an assignment in a job interview process",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ConfigProvider theme={customTokens}>
            {children}
          </ConfigProvider>
        </Provider>
      </body>
    </html>
  );
}
