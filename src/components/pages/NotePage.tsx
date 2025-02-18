"use client";

import NoteContextProvider from "@/context/page/NoteContextProvider";
import { FNote } from "@/types";
import React from "react";
import CloseConfirmationModal from "../feature/note/CloseConfirmationModal";
import NoteEditorSection from "../feature/note/NoteEditorSection";
import NoteStatusSection from "../feature/note/NoteStatusSection";
import { NukeConfirmationModal } from "../feature/note/NukeConfirmationModal";
import PasswordSetModal from "../feature/note/PasswordSetModal";

type NotePageProps = {
  code: string;
  note: FNote | null;
};

function PageComponent(props: NotePageProps) {
  const { code, note } = props;
  const [noteExists] = React.useState(Boolean(note));
  return (
    <>
      <PasswordSetModal />
      <NukeConfirmationModal note={note} code={code} />
      <CloseConfirmationModal />
      <NoteStatusSection code={code} noteExists={noteExists} />
      <NoteEditorSection note={note} code={code} />
    </>
  );
}

export default function NotePage({
  note,
  code,
}: {
  note: FNote | null;
  code: string;
}) {
  return (
    <>
      <NoteContextProvider note={note}>
        <PageComponent note={note} code={code} />
      </NoteContextProvider>
    </>
  );
}
