"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Routes from "@/constants/routes.constants";
import { useThemeContext } from "@/context/ThemeContextProvider";
import { useNoteContext } from "@/context/page/NoteContextProvider";
import { NotePageActions } from "@/reducers/NotePageStateReducer";
import { cn } from "@/utils";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CloseConfirmationModal() {
  const { state, dispatch } = useNoteContext();
  const { theme } = useThemeContext();
  const { showCloseConfirmationModal } = state;

  const router = useRouter();

  const onOpenChange = (open: boolean) => {
    if (!open) dispatch(NotePageActions.setShowCloseConfirmationModal(null));
  };

  const yesImSureClickHandler = async () => {
    if (showCloseConfirmationModal === "close") router.push(Routes.home);
    else location.reload();
  };

  return (
    <Dialog
      open={Boolean(showCloseConfirmationModal)}
      onOpenChange={onOpenChange}
    >
      <DialogContent className={cn(theme, "text-foreground")}>
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-14 w-14" />
          <h3 className="mb-5 text-lg font-normal">
            <p>
              {`Are you sure you want to 
              ${showCloseConfirmationModal === "refresh" ? `reload` : `exit`} 
              without saving your changes?`}
            </p>
          </h3>
          <div className="flex justify-center gap-4">
            <Button variant={"destructive"} onClick={yesImSureClickHandler}>
              {"Yes, I'm sure"}
            </Button>
            <Button
              variant={"secondary"}
              onClick={() =>
                dispatch(NotePageActions.setShowCloseConfirmationModal(null))
              }
            >
              No, cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
