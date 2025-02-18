import { saveNote } from "@/endpoints";
import { NoteUpdatePayload } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSaveNote = () => {
  const queryClient = useQueryClient();
  const saveNoteMutation = useMutation({
    mutationFn: (note: NoteUpdatePayload) => saveNote(note),
    onSuccess: (data) => {
      queryClient.setQueryData(["note", data.id], data);
    },
  });

  return {
    isPending: saveNoteMutation.isPending,
    isError: saveNoteMutation.isError,
    isSuccess: saveNoteMutation.isSuccess,
    saveNoteMutation,
  };
};

export default useSaveNote;
