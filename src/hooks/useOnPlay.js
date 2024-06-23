import useMusicPlayer from '@/hooks/useMusicPlayer';
import { useCallback } from 'react';

const useOnPlay = (tracks = []) => {
  const setId = useMusicPlayer((state) => state.setId);
  const setIds = useMusicPlayer((state) => state.setIds);

  const onPlay = useCallback((id) => {
    const ids = tracks.map((t) => (typeof t === 'object' ? t.id : t));
    setId(id);
    setIds(ids);
  }, [setId, setIds, tracks]);

  return onPlay;
};

export default useOnPlay;