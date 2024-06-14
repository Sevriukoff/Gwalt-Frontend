import create from 'zustand';
import { persist } from 'zustand/middleware';

const useMusicPlayer = create(
  persist(
    (set) => ({
      ids: [],
      activeId: undefined,
      isPlaying: false,
      progress: 0,
      isSeekingFromWaveform: false,
      setId: (id) => set({ activeId: id, isPlaying: true, progress: 0 }),
      setIds: (ids) => set({ ids }),
      reset: () => set({ ids: [], activeId: undefined, isPlaying: false, progress: 0 }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setProgress: (progress) => set({ progress }),
      setIsSeekingFromWaveform: (isSeekingFromWaveform) => set({ isSeekingFromWaveform }),
    }),
    {
      name: 'music-player-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isPlaying = false; // Устанавливаем isPlaying в false при восстановлении состояния
          state.progress = 0;
        }
      },
    },
  ),
);

export default useMusicPlayer;
