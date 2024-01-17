"use client";

import notePageStateReducer from "@/reducers/NotePageStateReducer";
import { FNote, NotePageState } from "@/types";
import React from "react";

type NoteContextValue = {
  state: NotePageState;
  dispatch: ReturnType<typeof React.useReducer>[1];
};

const NoteContext = React.createContext<NoteContextValue | null>(null);

const NoteContextProvider = ({
  children,
  note,
}: {
  children?: React.ReactNode | undefined;
  note: FNote | null;
}) => {
  //console.log("Note Content", note?.content);
  const initialState: NotePageState = {
    editable: false,
    isEncrypted: note?.isEncrypted || false,
    isLocked: note?.isEncrypted || false,
    password: "",
    passwordError: "",
    unlockPassword: "",
    unlockedContent: note?.isEncrypted ? null : note?.content || "",
    content: note?.content || "",
    showPasswordSetModal: false,
    showNukeConfirmationModal: false,
  };
  const [state, dispatch] = React.useReducer(
    notePageStateReducer,
    initialState
  );
  //console.log("State Content", state.content);
  return (
    <NoteContext.Provider value={{ state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};

const useNoteContext = () => React.useContext(NoteContext) as NoteContextValue;

export default NoteContextProvider;

export { NoteContext, useNoteContext };
