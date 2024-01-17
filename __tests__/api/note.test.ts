/**
 * @jest-environment node
 */

import { prisma } from "@/clients/prismaClient";
import { FNote, NoteUpdatePayload } from "@/types";
import { decrypt, encrypt, getFNoteFromNote, getHashDigest } from "@/utils";
import { afterAll, describe, expect, test } from "@jest/globals";
import { Note } from "@prisma/client";
import axios from "axios";
import { generateRandomString } from "../test_utils";

const testTimestamp = Date.now();

const API_SERVER_URL = "http://localhost:3000/api";

function POST(note: Note) {
  return axios.post<FNote>(`${API_SERVER_URL}/notes`, note);
}

function PUT(note: NoteUpdatePayload) {
  return axios.put<FNote>(`${API_SERVER_URL}/notes/${note.id}`, note);
}

function DELETE(noteId: string, prevDigest: string | null) {
  return axios.delete<FNote>(
    `${API_SERVER_URL}/notes/${noteId}${
      prevDigest ? `?prevDigest=${encodeURIComponent(prevDigest)}` : ``
    }`
  );
}

function generateNote(idPrefix: string, isEncrypted: boolean) {
  const id = `${idPrefix}-${testTimestamp}`;
  const content = generateRandomString(2000);
  const secret = isEncrypted ? generateRandomString(256) : "";
  const digest = getHashDigest(id, content, secret);

  const note: Note = {
    id,
    content: isEncrypted ? encrypt(content, secret) : content,
    digest,
    isEncrypted,
  };

  return { note, secret, oc: content };
}

function modifyNoteContent(note: Note, secret = "") {
  const content = generateRandomString(2000);
  const digest = getHashDigest(note.id, content, secret);
  const newNote = {
    ...note,
    content: secret ? encrypt(content, secret) : content,
    digest,
  };

  return { newNote, oc: content };
}

describe("Note API tests", () => {
  let ids: string[] = [];

  describe("POST a new note", () => {
    test("POST a new unencrypted note", async () => {
      const { note } = generateNote("test1", false);
      ids.push(note.id);

      const res = await POST(note);
      expect(res).toBeDefined();
      expect(res.status).toEqual(200);
      expect(res.data).toMatchObject(getFNoteFromNote(note));
    });

    test("POST a new encrypted note", async () => {
      const { note, secret, oc } = generateNote("test2", true);
      ids.push(note.id);

      const res = await POST(note);

      expect(res).toBeDefined();
      expect(res.status).toEqual(200);
      expect(getFNoteFromNote(note)).toMatchObject(res.data);
      const dc = decrypt(res.data.content, secret);
      expect(dc).toEqual(oc);
    });

    test("POST a new note with an existing id", async () => {
      const { note } = generateNote("test2", true);
      ids.push(note.id);

      expect(POST(note)).rejects.toBeDefined();
    });
  });

  describe("PUT a note", () => {
    test("PUT an unencrypted note", async () => {
      const { note } = generateNote("test3", false);
      ids.push(note.id);

      await POST(note);

      const { newNote } = modifyNoteContent(note);

      const res = await PUT(newNote);

      expect(res).toBeDefined();
      expect(res.status).toEqual(200);
      expect(getFNoteFromNote(newNote)).toMatchObject(res.data);
    });

    test("PUT an encrypted note", async () => {
      const { note, secret, oc: oc1 } = generateNote("test4", true);
      ids.push(note.id);

      await POST(note);

      const prevDigest = getHashDigest(note.id, oc1, secret);

      const { newNote, oc: oc2 } = modifyNoteContent(note, secret);

      const res = await PUT({ ...newNote, prevDigest });

      expect(res).toBeDefined();
      expect(res.status).toEqual(200);
      expect(getFNoteFromNote(newNote)).toMatchObject(res.data);
      const dc = decrypt(res.data.content, secret);
      expect(dc).toEqual(oc2);
    });

    test("PUT an unencrypted -> encrypted note", async () => {
      const { note } = generateNote("test5", false);
      ids.push(note.id);

      await POST(note);

      const secret = generateRandomString(256);
      const prevDigest = null;

      const { newNote, oc: oc2 } = modifyNoteContent(note, secret);

      const res = await PUT({ ...newNote, prevDigest });

      expect(res).toBeDefined();
      expect(res.status).toEqual(200);
      expect(getFNoteFromNote(newNote)).toMatchObject(res.data);
      const dc = decrypt(res.data.content, secret);
      expect(dc).toEqual(oc2);
    });

    test("PUT an encrypted -> unencrypted note", async () => {
      const { note, secret, oc: oc1 } = generateNote("test6", true);
      ids.push(note.id);

      await POST(note);

      const prevDigest = getHashDigest(note.id, oc1, secret);

      const { newNote } = modifyNoteContent(note, "");

      const res = await PUT({ ...newNote, prevDigest });

      expect(res).toBeDefined();
      expect(res.status).toEqual(200);
      expect(getFNoteFromNote(newNote)).toMatchObject(res.data);
    });

    test("PUT an encrypted note with a different secret", async () => {
      const { note, secret, oc: oc1 } = generateNote("test7", true);
      ids.push(note.id);

      await POST(note);

      const newSecret = generateRandomString(256);
      const prevDigest = getHashDigest(note.id, oc1, secret);

      const { newNote, oc: oc2 } = modifyNoteContent(note, newSecret);

      const res = await PUT({ ...newNote, prevDigest });

      expect(res).toBeDefined();
      expect(res.status).toEqual(200);
      expect(getFNoteFromNote(newNote)).toMatchObject(res.data);
      const dc = decrypt(res.data.content, newSecret);
      expect(dc).toEqual(oc2);
    });

    test("PUT an encrypted note with the wrong prevHash", async () => {
      const { note, secret, oc: oc1 } = generateNote("test25", true);
      ids.push(note.id);

      await POST(note);

      const prevDigest = getHashDigest(note.id, "gibberish", secret);

      const { newNote } = modifyNoteContent(note, secret);

      expect(PUT({ ...newNote, prevDigest })).rejects.toBeDefined();
    });

    test("PUT a new note", async () => {
      const { note, secret, oc } = generateNote("test8", true);
      ids.push(note.id);

      const res = await PUT({ ...note, prevDigest: null });

      expect(res).toBeDefined();
      expect(res.status).toEqual(200);
      expect(getFNoteFromNote(note)).toMatchObject(res.data);
      const dc = decrypt(res.data.content, secret);
      expect(dc).toEqual(oc);
    });
  });

  describe("DELETE a note", () => {
    test("DELETE an encrypted note", async () => {
      const { note, secret, oc: oc } = generateNote("test9", true);
      ids.push(note.id);

      await PUT(note);

      const prevDigest = getHashDigest(note.id, oc, secret);

      const res = await DELETE(note.id, prevDigest);

      expect(res).toBeDefined();
      expect(res.status).toEqual(200);
      expect(getFNoteFromNote(note)).toMatchObject(res.data);
      const dc = decrypt(res.data.content, secret);
      expect(dc).toEqual(oc);
    });
    test("DELETE an unencrypted note", async () => {
      const { note } = generateNote("test900", false);
      ids.push(note.id);

      await PUT(note);

      const res = await DELETE(note.id, null);

      expect(res).toBeDefined();
      expect(res.status).toEqual(200);
      expect(getFNoteFromNote(note)).toMatchObject(res.data);
    });
    test("DELETE an encrypted note with the wrong prevHash", async () => {
      const { note, secret } = generateNote("test4856", true);
      ids.push(note.id);

      await PUT(note);

      const prevDigest = getHashDigest(note.id, "gibberish", secret);

      expect(DELETE(note.id, prevDigest)).rejects.toBeDefined();
    });
  });

  afterAll(() => {
    return prisma.note.deleteMany({ where: { id: { in: ids } } });
  });
});
