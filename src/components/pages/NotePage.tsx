"use client";

import NoteContextProvider from "@/context/page/NoteContextProvider";
import useGetNote from "@/hooks/data/useGetNote";
import { FNote } from "@/types";
import NoteEditorSection from "../feature/note/NoteEditorSection";
import NoteStatusSection from "../feature/note/NoteStatusSection";
import PasswordSetModal from "../feature/note/PasswordSetModal";
import Spinner from "../ui/spinner";
import RenderIf from "../utils/RenderIf";
import { NukeConfirmationModal } from "../feature/note/NukeConfirmationModal";
import React from "react";

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
      <NoteStatusSection code={code} noteExists={noteExists} />
      <NoteEditorSection note={note} code={code} />
    </>
  );
}

export default function NotePage({ params }: { params: { code: string } }) {
  const { note, isSuccess, isFetching } = useGetNote(params.code);
  return (
    <>
      <RenderIf isTrue={isFetching}>
        <Spinner />
      </RenderIf>
      <RenderIf isTrue={!isFetching && isSuccess}>
        <NoteContextProvider note={note}>
          <PageComponent note={note} code={params.code} />
        </NoteContextProvider>
      </RenderIf>
    </>
  );
}
