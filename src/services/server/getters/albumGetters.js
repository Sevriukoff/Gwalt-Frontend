import fetchRest from '@/services/common/fetchRest';

export const getAlbumAsync = async (albumId) => {
  const url = `/v1/albums/${ albumId }`;

  const response = await fetchRest(
    url, { next: { tags: [url] } },
  );

  return await response.json();
};

export const getAlbumAuthorsAsync = async (albumId) => {
  const url = `/v1/albums/${ albumId }/authors`;

  const response = await fetchRest(
    url, { next: { tags: [url] } },
  );

  return await response.json();
};

export const getAlbumTracksAsync = async (albumId) => {
  const url = `/v1/albums/${ albumId }/tracks`;

  const response = await fetchRest(
    url, { next: { tags: [url] } },
  );

  return await response.json();
};