import { prisma } from "@/clients/prismaClient";
import { getFNoteFromNote } from "@/utils";

export async function getNoteById(id: string) {
  const note = await prisma.note.findUnique({ where: { id } });
  return note ? getFNoteFromNote(note) : null;
}
