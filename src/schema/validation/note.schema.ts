import {
  MAX_CODE_LENGTH,
  MAX_CONTENT_LENGTH,
} from "@/constants/validation.constants";
import { z } from "zod";

export const FNoteSchema = z.object({
  id: z.string().max(MAX_CODE_LENGTH),
  content: z.string().min(1).max(MAX_CONTENT_LENGTH),
  isEncrypted: z.boolean(),
});
export const NoteSchema = z
  .object({
    digest: z.string(),
  })
  .merge(FNoteSchema);

export const NoteUpdatePayloadSchema = z
  .object({
    digest: z.string(),
    prevDigest: z.string().nullish(),
  })
  .merge(FNoteSchema);
