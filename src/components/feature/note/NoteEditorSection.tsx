import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import RenderIf from "@/components/utils/RenderIf";
import Routes from "@/constants/routes.constants";
import { fadeAndSlideUp, fadeO } from "@/constants/variants.constants";
import { useNoteContext } from "@/context/page/NoteContextProvider";
import useSaveNote from "@/hooks/data/useSaveNote";
import { NotePageActions } from "@/reducers/NotePageStateReducer";
import { FNote } from "@/types";
import { cn, decrypt, getSaveNotePayload, isNoteChanged } from "@/utils";
import { motion } from "framer-motion";
import { PenLineIcon, Trash2, UnlockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import NoteCharactersRemaining from "./NoteCharactersRemaining";

const NoteEditorSection = ({
  note,
  code,
}: {
  note: FNote | null;
  code: string;
}) => {
  const { state, dispatch } = useNoteContext();
  const { content, editable, isEncrypted, isLocked } = state;

  //console.log(content);

  const router = useRouter();
  const { saveNoteMutation, isPending: isSaving } = useSaveNote();

  const handleUnlockClick = () => {
    if (state.password) {
      const decryptedContent = decrypt(state.content, state.password);
      if (!decryptedContent) toast.error("Invalid password");
      dispatch(NotePageActions.noteDecrypted(decryptedContent));
    }
  };
  const handleSaveClick = async () => {
    const toastId = toast.loading("Saving...");
    try {
      const payload = getSaveNotePayload({ code, state });
      await saveNoteMutation.mutateAsync(payload);
      toast.success("Note saved successfully", { id: toastId });
      dispatch(NotePageActions.noteSaved(state.password, state.content));
      return true;
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
      return false;
    }
  };
  const handleSaveAndCloseClick = async () => {
    handleSaveClick().then((isSuccess) => {
      if (isSuccess) {
        router.push(Routes.home);
      }
    });
  };
  const handleRefreshClick = async () => {
    if (isNoteChanged({ note, state })) {
      dispatch(NotePageActions.setShowCloseConfirmationModal("refresh"));
    } else location.reload();
  };
  const handleCloseClick = () => {
    if (isNoteChanged({ note, state })) {
      dispatch(NotePageActions.setShowCloseConfirmationModal("close"));
    } else router.push(Routes.home);
  };

  return (
    <motion.div variants={fadeO} initial="hidden" animate="visible">
      <section className="pb-8">
        <Card className="flex flex-col gap-y-4 p-6">
          <RenderIf isTrue={isLocked}>
            <motion.div
              className="flex flex-col items-center justify-center gap-y-4"
              variants={fadeAndSlideUp}
            >
              <div className="mb-2 text-center text-xl sm:text-2xl tracking-tight">
                This note has been
                <span className="font-semibold"> locked.</span> Please enter the
                second code to fully decrypt it.
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-3">
                <Input
                  type="password"
                  placeholder="Type your password"
                  onChange={(e) =>
                    dispatch(NotePageActions.passwordChanged(e.target.value))
                  }
                  onKeyDown={(e) => {
                    if (e.key == "Enter") handleUnlockClick();
                  }}
                />
                <Button
                  variant={"default"}
                  onClick={handleUnlockClick}
                  className="max-sm:w-full"
                  disabled={!state.password}
                >
                  <UnlockKeyhole className="h-4 w-4 mr-2" /> Unlock
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={handleCloseClick}
                  className="max-sm:w-full"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </RenderIf>
          <RenderIf isTrue={!isLocked}>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center"
              variants={fadeAndSlideUp}
            >
              <Tabs defaultValue="reading">
                {/* <Button
                  variant={editable ? "secondary" : "outline"}
                  className={cn("rounded-r-none", editable ? "border-4" : "")}
                  onClick={() => dispatch(NotePageActions.editingViewClicked())}
                >
                  Editing View
                </Button>
                <Button
                  variant={!editable ? "secondary" : "outline"}
                  className={cn("rounded-l-none", !editable ? "border-4" : "")}
                  onClick={() => dispatch(NotePageActions.readingViewClicked())}
                >
                  Reading View
                </Button> */}
                <TabsList>
                  <TabsTrigger
                    value={"editing"}
                    onClick={() =>
                      dispatch(NotePageActions.editingViewClicked())
                    }
                  >
                    Editing View
                  </TabsTrigger>
                  <TabsTrigger
                    value={"reading"}
                    onClick={() =>
                      dispatch(NotePageActions.readingViewClicked())
                    }
                  >
                    Reading View
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex gap-x-2 items-center">
                <Label>Encrypt with password</Label>
                <Switch
                  checked={isEncrypted}
                  onCheckedChange={() =>
                    dispatch(NotePageActions.encryptWithPasswordToggled())
                  }
                />
              </div>
            </motion.div>
            <motion.div variants={fadeAndSlideUp}>
              <Textarea
                rows={10}
                readOnly={!editable}
                value={content}
                onChange={(e) =>
                  dispatch(NotePageActions.contentChanged(e.target.value))
                }
              />
              <NoteCharactersRemaining />
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row gap-2"
              variants={fadeAndSlideUp}
            >
              <Button
                variant={"secondary"}
                onClick={handleSaveAndCloseClick}
                disabled={isSaving || !state.content}
              >
                Save & Close
              </Button>
              <Button
                variant={"secondary"}
                onClick={handleSaveClick}
                disabled={isSaving || !state.content}
              >
                Save
              </Button>
              <Button
                variant={"secondary"}
                onClick={handleRefreshClick}
                disabled={isSaving}
              >
                Refresh
              </Button>
              <Button
                variant={"secondary"}
                onClick={handleCloseClick}
                disabled={isSaving}
              >
                Close
              </Button>
              <Button
                onClick={() =>
                  dispatch(NotePageActions.changePasswordClicked())
                }
                className={cn(
                  !isEncrypted ? "hidden sm:invisible sm:inline-flex" : ""
                )}
              >
                <PenLineIcon className="h-4 w-4 mr-2" />
                Change password
              </Button>
              <Button
                variant={"destructive"}
                disabled={isSaving}
                onClick={() => dispatch(NotePageActions.nukeButtonClicked())}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <span>Nuke</span>
              </Button>
            </motion.div>
          </RenderIf>
        </Card>
      </section>
    </motion.div>
  );
};

export default NoteEditorSection;
