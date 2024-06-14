import useMusicPlayer from "@/hooks/useMusicPlayer";

const useOnPlay = (tracks = []) => {
  const musicPlayerStore = useMusicPlayer();

  const onPlay = (id) => {
    musicPlayerStore.setId(id);
    musicPlayerStore.setIds(tracks.map((t) => t.id));
  }

  return onPlay;
}

export default useOnPlay;