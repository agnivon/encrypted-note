import { MAX_CONTENT_LENGTH } from "@/constants/validation.constants";
import { useNoteContext } from "@/context/page/NoteContextProvider";
import { encrypt } from "@/utils";

export default function NoteCharactersRemaining() {
  const { state } = useNoteContext();

  const contentLength = (
    state.isEncrypted ? encrypt(state.content, state.password) : state.content
  ).length;

  const charactersRemaining = state.content
    ? MAX_CONTENT_LENGTH - contentLength
    : MAX_CONTENT_LENGTH;

  const lengthExceeded = charactersRemaining < 0;

  return (
    <div className="flex items-center justify-between text-sm py-1">
      <span
        className={lengthExceeded ? "text-destructive visible" : "invisible"}
      >
        Maximum characters exceeded
      </span>
      <span /* className={state.content ? "visible" : "invisible"} */>
        {`${Math.abs(charactersRemaining)}${
          state.isEncrypted ? " encrypted" : ""
        } characters ${lengthExceeded ? "over limit" : "remaining"}`}
      </span>
    </div>
  );
}
