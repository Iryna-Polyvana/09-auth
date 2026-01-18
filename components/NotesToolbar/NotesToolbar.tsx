'use client';

import css from './NotesToolbar.module.css';
import SearchBox from '../SearchBox/SearchBox';
import Link from 'next/link';

interface NotesToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function NotesToolbar({
  search,
  onSearchChange,
}: NotesToolbarProps) {
  return (
    <div className={css.toolbar}>
      <SearchBox value={search} onChange={onSearchChange} />

      <Link className={css.link} href="/notes/action/create">
        Create note +
      </Link>
    </div>
  );
}
