import Container from '@/components/Container';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="flex mt-20">
      <Container className="flex flex-center justify-between p-6">
        <div className='flex'>
        <p className="text-center text-zinc-500">
          Built with 
        </p>
        <Heart className='w-6 h-6 mx-2' color='red' fill='red'/>
        <p className="text-center text-zinc-500">
          by Manveer Singh
        </p>
        </div>
        <p className='text-center text-zinc-500'>Copyright © 2025 | Manveer Singh</p>
      </Container>
    </footer>
  );
}

export default Footer;