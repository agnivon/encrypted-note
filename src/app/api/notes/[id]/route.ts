import { prisma } from "@/clients/prismaClient";
import { DigestError } from "@/errors/DigestError";
import { NoteUpdatePayloadSchema } from "@/schema/validation/note.schema";
import { getFNoteFromNote } from "@/utils";
import { Note } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

function checkDigestOrThrow({
  prevDigest,
  prevNote,
}: {
  prevDigest: string | null | undefined;
  prevNote: Note | null;
}) {
  if (prevNote?.isEncrypted) {
    if (prevDigest) {
      if (prevNote.digest !== prevDigest) throw new DigestError("Unauthorized");
    } else {
      throw new DigestError("Validation Error");
    }
  }
}

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const note = await prisma.note.findUnique({ where: { id: params.id } });
    return NextResponse.json(note ? getFNoteFromNote(note) : null);
  } catch (err) {
    return new Response("Internal Server Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { prevDigest, ...note } = NoteUpdatePayloadSchema.required({
      content: true,
      isEncrypted: true,
      digest: true,
    }).parse(await request.json());

    const prevNote = await prisma.note.findUnique({
      where: { id: params.id },
    });

    checkDigestOrThrow({
      prevDigest,
      prevNote,
    });

    const updatedNote = await prisma.note.upsert({
      where: { id: params.id },
      create: {
        id: params.id,
        content: note.content,
        isEncrypted: note.isEncrypted,
        digest: note.digest,
      },
      update: {
        content: note.content,
        isEncrypted: note.isEncrypted,
        digest: note.digest,
      },
    });

    return NextResponse.json(getFNoteFromNote(updatedNote));
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      return new Response("Validation Error", { status: 400 });
    } else if (err instanceof DigestError) {
      return new Response(err.message, {
        status: 400,
        statusText: err.message,
      });
    } else {
      return new Response("Internal Server Error", {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const prevDigest = searchParams.get("prevDigest");

    const prevNote = await prisma.note.findUniqueOrThrow({
      where: { id: params.id },
    });

    checkDigestOrThrow({
      prevDigest,
      prevNote,
    });

    const deletedNote = await prisma.note.delete({
      where: { id: params.id },
    });

    return NextResponse.json(getFNoteFromNote(deletedNote));
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      return new Response("Validation Error", {
        status: 400,
        statusText: "Validation Error",
      });
    } else if (err instanceof DigestError) {
      return new Response(err.message, {
        status: 400,
        statusText: err.message,
      });
    } else {
      return new Response("Internal Server Error", {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  }
}
