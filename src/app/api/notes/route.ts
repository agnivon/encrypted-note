import { prisma } from "@/clients/prismaClient";
import { NoteSchema } from "@/schema/validation/note.schema";
import { getFNoteFromNote } from "@/utils";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const note = NoteSchema.required().parse(await request.json());

    const createdNote = await prisma.note.create({ data: note });

    return NextResponse.json(getFNoteFromNote(createdNote));
  } catch (err) {
    console.log(err);
    if (err instanceof ZodError) {
      return new NextResponse("Validation Error", {
        status: 400,
        statusText: "Validation Error",
      });
    } else {
      return new NextResponse("Internal Server Error", {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  }
}
