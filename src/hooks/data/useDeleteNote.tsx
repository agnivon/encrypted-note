import { deleteNote } from "@/endpoints";
import { useMutation } from "@tanstack/react-query";

const useDeleteNote = () => {
  const deleteNoteMutation = useMutation({
    mutationFn: ({
      noteId,
      prevDigest,
    }: {
      noteId: string;
      prevDigest: string | null;
    }) => deleteNote(noteId, prevDigest),
  });

  return {
    isPending: deleteNoteMutation.isPending,
    isError: deleteNoteMutation.isError,
    isSuccess: deleteNoteMutation.isSuccess,
    deleteNoteMutation,
  };
};

export default useDeleteNote;
