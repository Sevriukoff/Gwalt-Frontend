import fetchRest from '@/services/common/fetchRest';

const getUsersByAlbumAsync = async (albumId) => {
  const response = await fetchRest(
    `/v1/albums/${ albumId }/authors`, { next: { tags: [`/v1/albums/${ albumId }/authors`] } },
  );

  return await response.json();
};