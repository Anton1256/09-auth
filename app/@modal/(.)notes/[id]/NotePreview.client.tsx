"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api/clientApi";
import { Note } from "@/types/note";
import Loading from "@/app/loading";

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <Loading />;

  if (error) return <p className={css.error}>Failed to load note preview</p>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <button className={css.editBtn}>Edit note</button>
            </div>
            <p className={css.content}>{note.content}</p>
            {note.tag && <p className={css.tag}>Tag: {note.tag}</p>}
            <p className={css.date}>{note.createdAt}</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default NotePreviewClient;