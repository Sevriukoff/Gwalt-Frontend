import './globals.css';
import './react-select.scss';
import '@radix-ui/themes/styles.css';
import { Inter, Roboto } from 'next/font/google';
import React from 'react';
import Header from '@/components/header/header';
import { AuthProvider } from '@/hoc/authContext';
import { getAuthUserId, isAuth } from '@/utils/server/auth';
import Footer from '@/components/footer';
import MusicPlayer from '@/components/musicPlayer/musicPlayer';
import PlayerLayout from '@/components/playerLayout';
import ModalProvider from '@/providers/modalProvider';
import ToasterProvider from '@/providers/toasterProvider';
import { SWRProvider } from '@/providers/swrProvider';
import fetchRest from '@/utils/common/fetchRest';
import { Theme } from '@radix-ui/themes';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ subsets: ['latin', 'cyrillic'], weight: ['100', '300', '400', '500', '700', '900'] });

export const metadata = {
  title: 'GWALT, Best way to listen',
  description: 'Listen to music for your pleasure',
};

const fetchUser = async (id) => {
  try {
    const response = await fetchRest(`/v1/users/${ id }?includes=Albums;Albums.Tracks&withStats=true`);
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const getFallbackValue = async () => {
  if (isAuth()) {
    const userId = getAuthUserId();
    const fallbackString = `/v1/users/${ userId }?includes=Albums;Albums.Tracks&withStats=true`;

    return {
      [fallbackString]: await fetchUser(userId),
    };
  }
};

export default async function RootLayout({ children, centerBlock, rightSide }) {
  return (
    <html lang='en'>
    <AuthProvider initialIsAuthenticated={ isAuth() } initialUserId={ getAuthUserId() }>
      <SWRProvider fallback={ await getFallbackValue() }>
        <body className={ inter.className }>
        <Theme>
          <ModalProvider />
          <ToasterProvider />
          <Header />
          <main className='min-h-screen max-w-[1450px] mx-auto my-[-2px] mb-6'>
            <PlayerLayout>
              { children }
              <div className='grid grid-cols-[1fr_350px] sm:grid-rows-2 gap-4 mt-5'>
                <div className='overflow-hidden px-6 border-r border-[#f2f2f2]'>
                  { centerBlock }
                </div>
                <div className=''>
                  <div className='sticky top-6 right-0'>
                    { rightSide }
                    <Footer />
                  </div>
                </div>
              </div>
              <MusicPlayer />
            </PlayerLayout>
          </main>
        </Theme>
        </body>
      </SWRProvider>
    </AuthProvider>
    </html>
  );
}