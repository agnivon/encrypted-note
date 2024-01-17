import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useThemeContext } from "@/context/ThemeContextProvider";
import { useNoteContext } from "@/context/page/NoteContextProvider";
import { NotePageActions } from "@/reducers/NotePageStateReducer";
import { cn } from "@/utils";
import React from "react";
import { toast } from "sonner";

const PasswordSetModal = () => {
  //const alert = useAlert();
  const { state, dispatch } = useNoteContext();
  const { theme } = useThemeContext();
  const { password, showPasswordSetModal } = state;
  const [newPassword, setNewPassword] = React.useState<string>(password);
  const onOpenChange = () => dispatch(NotePageActions.setPasswordModalClosed());
  const handleSetPassword = () => {
    if (newPassword) {
      dispatch(NotePageActions.passwordSet(newPassword));
      toast.info("Password set");
    }
    //alert.success("Password set successfully");
  };
  return (
    <Dialog open={showPasswordSetModal} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px] text-foreground", theme)}>
        <DialogHeader>
          <DialogTitle>Set a password for encryption</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Type password here"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") handleSetPassword();
          }}
        />
        <DialogFooter>
          <Button variant={"secondary"} onClick={handleSetPassword}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordSetModal;
