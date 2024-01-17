import { getNoteById } from "@/endpoints";
import { useQuery } from "@tanstack/react-query";

const useGetNote = (noteId: string) => {
  const getNoteQuery = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => getNoteById(noteId),
    refetchOnMount: true,
  });

  const note = getNoteQuery.data || null;

  const { isLoading, isFetching, isError, isSuccess, refetch } = getNoteQuery;

  /* console.log(
    `Is Loading: ${isLoading} Is Error: ${isError} Is Success: ${isSuccess}`
  ); */

  return {
    isLoading,
    isError,
    isSuccess,
    isFetching,
    refetch,
    getNoteQuery,
    note,
  };
};

export default useGetNote;
