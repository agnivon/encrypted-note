import {
  FNoteSchema,
  NoteUpdatePayloadSchema,
} from "@/schema/validation/note.schema";
import { z } from "zod";

export type FNote = z.infer<typeof FNoteSchema>;

export type NoteUpdatePayload = z.infer<typeof NoteUpdatePayloadSchema>;

export type NotePageState = {
  editable: boolean;
  isEncrypted: boolean;
  isLocked: boolean;
  password: string;
  passwordError: string;
  unlockPassword: string;
  unlockedContent: string | null;
  content: string;
  showPasswordSetModal: boolean;
  showNukeConfirmationModal: boolean;
};
