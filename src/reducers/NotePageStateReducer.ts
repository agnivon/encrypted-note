import { MAX_CONTENT_LENGTH } from "@/constants/validation.constants";
import { NotePageState } from "@/types";
import { decrypt } from "@/utils";
import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from "immer-reducer";

class NotePageStateReducer extends ImmerReducer<NotePageState> {
  noteDecrypted(decryptedContent: string) {
    if (decryptedContent) {
      this.draftState.unlockPassword = this.draftState.password;
      this.draftState.unlockedContent = decryptedContent;
      this.draftState.content = decryptedContent;
      this.draftState.isLocked = false;
      this.draftState.passwordError = "";
    } else {
      this.draftState.passwordError = "Incorrect Password";
    }
  }
  editingViewClicked() {
    this.draftState.editable = true;
  }
  readingViewClicked() {
    this.draftState.editable = false;
  }
  encryptWithPasswordToggled() {
    // this.draftState.isEncrypted = !this.draftState.isEncrypted;
    if (!this.draftState.isEncrypted) {
      this.draftState.showPasswordSetModal = true;
    } else this.draftState.isEncrypted = false;
  }
  changePasswordClicked() {
    this.draftState.showPasswordSetModal = true;
  }
  passwordChanged(password: string) {
    this.draftState.password = password;
  }
  contentChanged(content: string) {
    if (content.length <= MAX_CONTENT_LENGTH) this.draftState.content = content;
  }
  setPasswordModalClosed() {
    this.draftState.showPasswordSetModal = false;
    if (!this.draftState.isEncrypted) {
      this.draftState.password = "";
    }
  }
  passwordSet(password: string) {
    this.draftState.showPasswordSetModal = false;
    this.draftState.password = password;
    if (this.draftState.password) {
      this.draftState.isEncrypted = true;
    } else this.draftState.isEncrypted = false;
  }
  noteSaved(unlockPassword: string, unlockedContent: string) {
    this.draftState.unlockPassword = unlockPassword;
    this.draftState.unlockedContent = unlockedContent;
  }
  nukeButtonClicked() {
    this.draftState.showNukeConfirmationModal = true;
  }
  nukeConfirmationModalClosed() {
    this.draftState.showNukeConfirmationModal = false;
  }
  setShowCloseConfirmationModal(
    show: NotePageState["showCloseConfirmationModal"]
  ) {
    this.draftState.showCloseConfirmationModal = show;
  }
}

const NotePageActions = createActionCreators(NotePageStateReducer);
const notePageStateReducer = createReducerFunction(NotePageStateReducer);

export default notePageStateReducer;
export { NotePageActions, NotePageStateReducer };
