'use client';

import { fetchNotes, FetchNotesResponse } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import NotesToolbar from '@/components/NotesToolbar/NotesToolbar';

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const perPage = 12;
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        tag: tag === 'all' ? undefined : tag,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error</p>;

  return (
    <>
      <NotesToolbar search={search} onSearchChange={handleSearchChange} />
      {!isLoading && !isError && data && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {data.totalPages > 1 && (
        <Pagination
          pageCount={totalPages}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </>
  );
}
