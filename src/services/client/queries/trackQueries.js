import fetchRest from '@/services/common/fetchRest';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export const useTrack = () => {

};

const fetcher = async (url, trackIds) => {
  return await Promise.all(trackIds.map(id => fetchRest(`${ url }/${ id }?includes=Album.Authors`).then(res => res.json())));
};

export const useTracks = (trackIds, options) => {

  if (!trackIds || trackIds.length === 0) {
    return;
  }

  const {
    data,
    error,
    mutate,
    isValidating,
  } = useSWR(['/v1/tracks/', trackIds], ([url, trackIds]) => fetcher(url, trackIds), options);

  return {
    data,
    error,
    mutate,
    isLoading: !error && !data,
    isValidating,
  };
};

const lazyTrackFetcher = async (url) => {
  const response = await fetchRest(url);
  const data = await response.json();

  // Проверка структуры данных и извлечение ID треков
  if (Array.isArray(data.ids)) {
    return data.ids;
  } else if (data.id !== undefined) {
    return [data.id];
  }
  return [];
};

export const useLazyTracksIds = (fetchTracksUrl) => {
  return useSWRMutation(fetchTracksUrl, lazyTrackFetcher);
};