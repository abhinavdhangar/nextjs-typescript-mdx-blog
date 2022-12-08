import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import React from 'react';
import NextNProgress from "nextjs-progressbar";
import Script from "next/script";
// import Breadcrumb from '../components/BreadCrumb';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  
  
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
     <Analytics/>
    <Script
    strategy="lazyOnload"
    src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
  />

  <Script id="google-analytics" strategy="lazyOnload">
    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
  </Script>
      <NextNProgress height={2} color="red" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
