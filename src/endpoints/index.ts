import { FNote, NoteUpdatePayload } from "@/types";
import { Note } from "@prisma/client";
import axios from "axios";

const API_SERVER_URL = "/api";

export const getNoteById = (id: string) => {
  return axios
    .get<FNote | null>(`${API_SERVER_URL}/notes/${id}`)
    .then((res) => res.data);
};

export const createNote = (note: Note) => {
  return axios
    .post<FNote>(`${API_SERVER_URL}/notes`, note)
    .then((res) => res.data);
};

export const saveNote = (note: NoteUpdatePayload) => {
  return axios
    .put<FNote>(`${API_SERVER_URL}/notes/${note.id}`, note)
    .then((res) => res.data);
};

export const deleteNote = (noteId: string, prevDigest: string | null) => {
  return axios
    .delete<FNote>(
      `${API_SERVER_URL}/notes/${noteId}${
        prevDigest ? `?prevDigest=${encodeURIComponent(prevDigest)}` : ``
      }`
    )
    .then((res) => res.data);
};
