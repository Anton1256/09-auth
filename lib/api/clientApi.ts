import { Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}

export type ServerBoolResponse = {
  message: string;
  success: boolean;
}

export type UserRequest = {
  email: string;
  password: string;
}

export interface AuthUserData {
  username: string;
  email: string;
  avatar?: string;
}

export const fetchNotes = async (
  search: string = "",
  page: number = 1,
  tag?: string
): Promise<NotesResponse> => {
  const params = {
    page,
    ...(search && { search }),
    ...(tag && tag !== 'All' && { tag }),
    perPage: 12
  };

  const { data } = await nextServer.get<NotesResponse>("/notes", { params });
  return data;
};

export const createNote = async (newNoteData: NewNoteData): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", newNoteData);
  return data;
};

export const deleteNote = async (noteId: string): Promise<ServerBoolResponse> => {
  const { data } = await nextServer.delete<ServerBoolResponse>(`/notes/${noteId}`);
  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
};

export const loginUser = async (credentials: UserRequest): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", credentials);
  return data;
};

export const registerUser = async (userData: UserRequest): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/register", userData);
  return data;
};

export const logoutUser = async (): Promise<ServerBoolResponse> => {
  const { data } = await nextServer.post<ServerBoolResponse>("/auth/logout");
  return data;
};

export const editUser = async (userData: AuthUserData): Promise<User> => {
  const { data } = await nextServer.patch<User>("/users/me", userData);
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const checkSession = async (): Promise<{ isAuthenticated: boolean }> => {
  try {
    const { data } = await nextServer.get<{ isAuthenticated: boolean }>("/auth/session");
    return data;
  } catch {
    return { isAuthenticated: false };
  }
};