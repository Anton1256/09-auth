import { cookies } from "next/headers";
import { nextServer } from "./api";
import { NotesResponse } from "./clientApi";
import { User } from "@/types/user";
import { Note } from "@/types/note";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getMeServer = async (): Promise<User> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchNotesServer = async (
  search: string,
  page: number,
  tag?: string
): Promise<NotesResponse> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<NotesResponse>("/notes", {
    params: {
      search,
      page,
      ...(tag && tag !== "All" && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchNoteByIdServer = async (noteId: string): Promise<Note> => {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};