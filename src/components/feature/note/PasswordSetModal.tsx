"use client";

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
import { Eye, EyeOff } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const PasswordSetModal = () => {
  //const alert = useAlert();
  const { state, dispatch } = useNoteContext();
  const { theme } = useThemeContext();
  const { password, showPasswordSetModal } = state;
  const [newPassword, setNewPassword] = React.useState<string>(password);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const onOpenChange = () => dispatch(NotePageActions.setPasswordModalClosed());
  const handleSetPassword = () => {
    if (newPassword) {
      dispatch(NotePageActions.passwordSet(newPassword));
      toast.info("Password set");
    }
    //alert.success("Password set successfully");
  };
  const EyeIcon = showPassword ? EyeOff : Eye;
  return (
    <Dialog open={showPasswordSetModal} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-[425px] text-foreground", theme)}>
        <DialogHeader>
          <DialogTitle>Set a password for encryption</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Input
            placeholder="Type password here"
            type={showPassword ? undefined : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") handleSetPassword();
            }}
          />
          <div className="absolute inset-y-0 right-2 flex justify-center items-center">
            <EyeIcon
              className="right-2 h-5 w-5 cursor-pointer"
              onClick={() => setShowPassword((show) => !show)}
            />
          </div>
        </div>
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
