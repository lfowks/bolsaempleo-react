import { useQuery, useMutation, useQueryClient } from 'react-query';

export default function useRequestProcessor() {
  const queryClient = useQueryClient();

  function query(key, queryFunction, options = {}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: key,
      queryFn: queryFunction,
      ...options,
    });
  }

  function mutate(key, mutationFunction, options = {}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation({
      mutationKey: key,
      mutationFn: mutationFunction,
      onSettled: () => queryClient.invalidateQueries(key),
      ...options,
    });
  }

  return { query, mutate };
}