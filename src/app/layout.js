import './globals.css'
import {Inter, Roboto} from 'next/font/google'
import React from "react";
import Header from "@/components/header";
import {AuthProvider} from "@/hoc/authContext";
import {getAuthUserId, isAuth} from "@/utils/server/auth";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin', 'cyrillic'], weight: ['100', '300', '400', '500', '700', '900'] })

export const metadata = {
  title: 'GWALT, Best way to listen',
  description: 'Listen to music for your pleasure',
}

export default function RootLayout({ children, centerBlock, rightSide }) {
  return (
      <html lang="en">
        <AuthProvider initialIsAuthenticated={isAuth()} initialUserId={getAuthUserId()}>
          <body className={ inter.className }>
          <Header/>
          <main className='min-h-screen max-w-[1450px] mx-auto my-[-2px] mb-6'>
            <div className="container max-w-[1450px] mx-auto px-8">
              {children}
              <div className="grid grid-cols-[1fr_350px] gap-4 mt-5">
                <div className="overflow-hidden px-6 border-r border-[#f2f2f2]">
                  {centerBlock}
                </div>
                <div className=''>
                  <div className='sticky top-6 right-0'>
                    {rightSide}
                    <Footer/>
                  </div>
                </div>
              </div>
            </div>
          </main>
          </body>
        </AuthProvider>
      </html>
  )
}
