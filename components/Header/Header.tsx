'use client'
import { useAuthStore } from '@/lib/store/authStore';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import css from './Header.module.css';
import Link from 'next/link';
const Header = () => {
  const {isAuthenticated} = useAuthStore();
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link className={css.headerNavigationLink} href="/">
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <li>
            <Link className={css.headerLink} href="/notes/filter/all">
              Notes
            </Link>
          </li>
          )}
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
};
export default Header;
