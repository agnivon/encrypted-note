import { getNoteById } from "@/app/api/notes/[id]/_utils";
import NotePage from "../pages/NotePage";

export const dynamic = "force-dynamic";

export default async function NoteDataWrapper({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const code = (await params).code;
  const note = await getNoteById(code);

  return <NotePage note={note} code={code} />;
}
