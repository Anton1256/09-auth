import { cookies } from "next/headers";
import { Note } from "@/types/note";
import { User } from "@/types/user";
import axios from "axios";

const BACKEND_URL = 'https://notehub-api.goit.study';

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

interface NotesListResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}

async function buildCookieHeader(): Promise<string> {
  const store = await cookies();
  return store.getAll().map(c => `${c.name}=${c.value}`).join('; ');
}

export async function getSessionServer(): Promise<User | null> {
  try {
    const { data } = await api.get<User>('/users/me', {
      headers: { Cookie: await buildCookieHeader() },
    });
    return data;
  } catch {
    return null;
  }
}

export async function getServerMe(): Promise<User> {
  const { data } = await api.get<User>('/users/me', {
    headers: { Cookie: await buildCookieHeader() },
  });
  return data;
}

export async function fetchNotesServer(
  search: string = '',
  page: number = 1,
  tag?: string
): Promise<NotesListResponse> {
  const params = {
    page,
    perPage: 12,
    ...(search && { search }),
    ...(tag && tag !== 'All' && { tag })
  };

  const { data } = await api.get<NotesListResponse>('/notes', {
    headers: { Cookie: await buildCookieHeader() },
    params,
  });
  
  return { 
    ...data,
    currentPage: data.currentPage || page
  };
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: await buildCookieHeader() },
  });
  return data;
}

export async function checkServerSession() {
  const res = await api.get('/auth/session', {
    headers: { Cookie: await buildCookieHeader() },
  });
  return res;
}