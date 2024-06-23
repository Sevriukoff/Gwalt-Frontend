import { useUser } from '@/services/client/queries/userQueries';
import useSWRMutation from 'swr/mutation';
import { patchUser } from '@/services/common/files';

export const usePatchUser = (userId) => {
  const { mutate } = useUser(userId);

  return useSWRMutation(`/v1/users/${ userId }`, patchUser, {
    onError: (error) => {

    },
    onSuccess: () => {
      mutate();
    },
  });
};