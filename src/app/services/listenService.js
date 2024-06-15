import fetchRest from '@/utils/common/fetchRest';

let activeListeningTime = 0;
let maxListeningTime = 0;
let lastPlayTime = 0;
let lastRecordedTime = 0;
let seekCount = 0;
let pauseCount = 0;

export const resetListeningData = () => {
  activeListeningTime = 0;
  maxListeningTime = 0;
  lastPlayTime = 0;
  lastRecordedTime = 0;
  seekCount = 0;
  pauseCount = 0;
};

export const updateMetrics = (currentTime) => {
  const deltaTime = currentTime - lastRecordedTime;
  activeListeningTime += deltaTime;

  if (currentTime > maxListeningTime && currentTime - lastRecordedTime <= deltaTime) {
    maxListeningTime = currentTime;
  }

  lastRecordedTime = currentTime;
};

export const setLastPlayTime = (currentTime) => {
  lastPlayTime = currentTime;
  lastRecordedTime = currentTime;
};

export const incrementSeekCount = () => {
  seekCount++;
};

export const incrementPauseCount = () => {
  pauseCount++;
};

export const sendListeningData = (trackId, volume, duration, currentTime) => {
  if ((activeListeningTime / duration) < 0.5) {
    console.log('Active listening time is less than 50% of total duration. No data will be sent.');
    return;
  }

  const listeningData = {
    listenableType: 'Track',
    listenableId: trackId,
    totalDuration: Math.floor(duration),
    endTime: Math.floor(currentTime),
    activeListeningTime: Math.floor(activeListeningTime),
    seekCount: seekCount,
    pauseCount: pauseCount,
    volume: volume,
  };

  fetchRest('/v1/listens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(listeningData),
  }).then(response => {
    if (!response.ok) {
      console.error('Failed to send listening data');
    }
  });
};
