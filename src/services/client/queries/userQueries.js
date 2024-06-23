import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '@/providers/swrProvider';

const buildUrl = (id, withStats, includes) => {
  let url = `/v1/users/${ id }`;
  const params = [];

  if (withStats) {
    params.push(`withStats=true`);
  }

  if (includes.length > 0) {
    params.push(`includes=${ includes.join(';') }`);
  }

  if (params.length > 0) {
    url += `?${ params.join('&') }`;
  }

  return url;
};

export const useUser = (id, withStats = false, includes = []) => {
  const { cache } = useSWRConfig();
  const url = id ? buildUrl(id, withStats, includes) : null;

  const swrResult = useSWR(url, fetcher, {
    use: [
      (useSWRNext) => (key, fetcher, config) => {
        const cachedUrls = Array.from(cache.keys()).filter(key => key.startsWith('/v1/users/'));
        for (let cachedUrl of cachedUrls) {
          if (cachedUrl.includes(`/v1/users/${ id }`) && cachedUrl !== url) {
            const data = cache.get(cachedUrl);
            if (data) {
              return { data, error: undefined, isValidating: false };
            }
          }
        }

        return useSWRNext(key, fetcher, config);
      },
    ],
  });

  return swrResult;
};