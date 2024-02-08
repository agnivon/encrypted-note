import { clsx, type ClassValue } from "clsx";
import CryptoJS from "crypto-js";
import Base64 from "crypto-js/enc-base64";
import { twMerge } from "tailwind-merge";
import { FNote, NotePageState, NoteUpdatePayload } from "./types";
import { Note } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encrypt(data: string, secret: string) {
  const cipherText = CryptoJS.AES.encrypt(data, secret).toString();
  return cipherText;
}

export function decrypt(data: string, secret: string) {
  try {
    const bytes = CryptoJS.AES.decrypt(data, secret);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
  } catch {
    return "";
  }
}

export function getHashDigest(nonce: string, data: string, password: string) {
  return Base64.stringify(
    CryptoJS.HmacSHA512(CryptoJS.SHA256(nonce + data), password)
  );
}

export function getSaveNotePayload({
  code,
  state,
}: {
  code: string;
  state: NotePageState;
}): NoteUpdatePayload {
  return {
    id: code,
    content: state.isEncrypted
      ? encrypt(state.content, state.password)
      : state.content,
    isEncrypted: state.isEncrypted,
    digest: getHashDigest(code, state.content, state.password),
    prevDigest: state.unlockedContent
      ? getHashDigest(code, state.unlockedContent, state.unlockPassword)
      : null,
  };
}

export function isNoteChanged({
  note,
  state,
}: {
  note: FNote | null;
  state: NotePageState;
}) {
  const decryptedCurrentContent = state.content;

  const decryptedNoteContent = state.unlockedContent || note?.content || "";

  return (
    decryptedCurrentContent !== decryptedNoteContent ||
    state.isEncrypted !== (note?.isEncrypted || false) ||
    state.password !== state.unlockPassword
  );
}

export function getFNoteFromNote(note: Note): FNote {
  const { digest, ...fNote } = note;
  return fNote;
}
