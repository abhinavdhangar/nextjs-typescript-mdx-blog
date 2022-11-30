import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import React,{useState,useEffect} from 'react';
import Breadcrumb from '../components/BreadCrumb';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  
  
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

    if (typeof window === 'undefined') {
    return <></>;
  } else {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
  
      <Component {...pageProps} />
    </ThemeProvider>
  );}
};

export default MyApp;
