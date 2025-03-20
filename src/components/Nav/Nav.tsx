'use client';

import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { Heart } from 'lucide-react';
import Container from '@/components/Container';

const Nav = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="flex  items-center h-auto py-4">
      <Container className={`flex justify-between gap-2 items-center flex-row ${isMobile ? 'flex-col' : 'flex-row'}`}>
        <h1 className="w-auto flex-grow-0 mb-0">
          <Link href="/">
            `25th Anniversary Photos&apos; Gallery
          </Link>
        </h1>
        <div className='flex items-start'>
        <p className="text-center text-zinc-500">
          Built with 
        </p>
        <Heart className='w-6 h-6 mx-2' color='#9c0e0e' fill='#9c0e0e'/>
        <p className="text-center text-zinc-500">
          by Manveer Singh
        </p>
        </div>
      </Container>
    </nav>
  )
}

export default Nav;