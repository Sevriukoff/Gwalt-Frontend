import './globals.css'
import {Inter, Roboto} from 'next/font/google'
import React from "react";
import Header from "@/components/header";

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin', 'cyrillic'], weight: ['100', '300', '400', '500', '700', '900'] })

export const metadata = {
  title: 'GWALT, Best way to listen',
  description: 'Listen to music for your pleasure',
}

export default function RootLayout({ children, leftSide, rightSide }) {
  return (
      <html lang="en">
        <body className={ inter.className }>
        <Header/>
        <main className='min-h-screen max-w-[1360px] mx-auto my-[-2px] mb-6'>
          <div className="container max-w-7xl mx-auto px-8">
            {children}
            <div className="grid grid-cols-[auto_350px] gap-4 mt-[380px]">
              <div className="overflow-hidden">
                {leftSide}
              </div>
              <div className=''>
                <div className='sticky top-6 right-0'>
                  {rightSide}
                  <div className="text-gray-500 text-sm border-t border-t-gray-100 pt-2 mt-6">
                    <a href="#" className="hover:underline">Legal</a> -
                    <a href="#" className="hover:underline">Privacy</a> -
                    <a href="#" className="hover:underline">Cookie Policy</a> -
                    <a href="#" className="hover:underline">Cookie Manager</a> -
                    <a href="#" className="hover:underline">Imprint</a> -
                    <a href="#" className="hover:underline">Artist Resources</a> -
                    <a href="#" className="hover:underline">Blog</a> -
                    <a href="#" className="hover:underline">Charts</a> -
                    <br/>
                    <span className="text-gray-700">
                    Language: <a href="#" className="text-blue-600 hover:underline">English (US)</a>
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        </body>
      </html>
  )
}
