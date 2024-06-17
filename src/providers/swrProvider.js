'use client';

import { SWRConfig } from 'swr';
import fetchRest from '@/utils/common/fetchRest';

export const fetcher = url => fetchRest(url).then(r => r.json());
export const SWRProvider = ({ fallback, children }) => {
  return <SWRConfig value={ {
    fetcher,
    fallback: fallback ? fallback : {},
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  } }>{ children }</SWRConfig>;
};