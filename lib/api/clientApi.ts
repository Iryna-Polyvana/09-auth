import { Note } from '@/types/note';
import nextServer from './api';
import User from '@/types/user';

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
  const res = await nextServer.get<FetchNotesResponse>('/notes', { params });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};
export type CreateNoteData = {
  title: string;
  content: string;
  tag: string;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const res = await nextServer.post<Note>('/notes', noteData);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

type RegisterData = {
  email: string;
  password: string;
};

export const register = async (data: RegisterData): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

type LoginData = {
  email: string;
  password: string;
};

export const login = async (data: LoginData): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

type UpdateMeData = {
  username: string;
};

export const updateMe = async (data: UpdateMeData): Promise<User> => {
  const res = await nextServer.patch<User>('/users/me', data);
  return res.data;
};
