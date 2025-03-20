import Link from 'next/link';

import Container from '@/components/Container';

const Nav = () => {
  return (
    <nav className="flex items-center h-16 border border-zinc-200">
      <Container className="flex gap-6 items-center flex-row">
        <p className="w-40 flex-grow-0 mb-0">
          <Link href="/">
            25th Anniversary Photos
          </Link>
        </p>
      </Container>
    </nav>
  )
}

export default Nav;