"use client";
import './globals.css'
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import customTokens from "./AntCustomTokens";
import Provider from "./clients/Provider";
import { useEffect, useState } from 'react';
import Preloader from './_components/Preloader';

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleContentLoad = () => {
      setLoading(false); 
    };
    requestAnimationFrame(() => {
      handleContentLoad();
    });

  }, []);
  
  return (
    <html lang="en">
      <body>
        <Provider>
          <ConfigProvider theme={customTokens}>
            {loading ? <Preloader /> : <></>}
            {children}
          </ConfigProvider>
        </Provider>
      </body>
    </html>
  );
}
