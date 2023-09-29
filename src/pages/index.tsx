import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Dashboard from './dashboard';
import { authenticated } from '@/util/utils';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [page, setPage] = useState("/");
  const router = useRouter();

  const checkForAuthentication =()=>{
    authenticated(router)
  }

  useEffect(() => {
    checkForAuthentication()
    setPage(router.pathname);
  }, [router.pathname]);
  
  return (
    <main>
      {(() => {
            switch (page) {
              case "/":
                return <Dashboard />;
            }
          })()}
    </main>
  )
}
