import { Note } from '@/types/note';
import nextServer from './api';
import { cookies } from 'next/headers';
import User from '@/types/user';

const getHeaders = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

type FetchNotesParams = {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
};

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const res = await nextServer.get<FetchNotesResponse>('/notes', {
    params,
    headers: await getHeaders(),
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: await getHeaders(),
  });
  return res.data;
};

export const checkServerSession = async () => {
  const res = await nextServer.get('/auth/session', {
    headers: await getHeaders(),
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const { data } = await nextServer.get('/users/me', {
    headers: await getHeaders(),
  });
  return data ?? null;
};
