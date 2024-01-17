import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Routes from "@/constants/routes.constants";
import { useThemeContext } from "@/context/ThemeContextProvider";
import { useNoteContext } from "@/context/page/NoteContextProvider";
import useDeleteNote from "@/hooks/data/useDeleteNote";
import { NotePageActions } from "@/reducers/NotePageStateReducer";
import { FNote } from "@/types";
import { cn, getHashDigest } from "@/utils";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const NukeConfirmationModal = ({
  note,
  code,
}: {
  note: FNote | null;
  code: string;
}) => {
  const router = useRouter();
  const { state, dispatch } = useNoteContext();
  const { theme } = useThemeContext();

  const { unlockPassword, unlockedContent } = state;

  const { showNukeConfirmationModal } = state;

  const { deleteNoteMutation } = useDeleteNote();

  const yesImSureClickHandler = async () => {
    try {
      if (note) {
        const prevDigest = unlockedContent
          ? getHashDigest(code, unlockedContent, unlockPassword)
          : null;
        await deleteNoteMutation.mutateAsync({ noteId: note.id, prevDigest });
      }
      dispatch(NotePageActions.nukeConfirmationModalClosed());
      toast.success("Note deleted successfully");
      router.push(Routes.home);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onOpenChange = () =>
    dispatch(NotePageActions.nukeConfirmationModalClosed());

  return (
    <Dialog open={showNukeConfirmationModal} onOpenChange={onOpenChange}>
      <DialogContent className={cn(theme, "text-foreground")}>
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-14 w-14" />
          <h3 className="mb-5 text-lg font-normal">
            <p>Are you sure you want to delete this note?</p>
          </h3>
          <div className="flex justify-center gap-4">
            <Button variant={"destructive"} onClick={yesImSureClickHandler}>
              {"Yes, I'm sure"}
            </Button>
            <Button
              variant={"secondary"}
              onClick={() =>
                dispatch(NotePageActions.nukeConfirmationModalClosed())
              }
            >
              No, cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
