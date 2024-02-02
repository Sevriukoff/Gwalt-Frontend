import './globals.css'
import { Inter } from 'next/font/google'
import React from "react";
import Header from "@/components/header";
import {AuthProvider} from "@/components/authProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GWALT, Best way to listen',
  description: 'Listen to music for your pleasure',
}

export default function RootLayout({ children }) {
  return (
      <AuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <Header/>
            <main className='min-h-screen max-w-[1140px] mx-auto my-[-2px]'>{children}</main>
            <footer className='flex justify-center mt-9'>
              <p>Designed by Grisha</p>
            </footer>
          </body>
        </html>
      </AuthProvider>
  )
}
