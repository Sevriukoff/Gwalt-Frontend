const BASE_CLIENT_URL = '/api';
const BASE_SERVER_URL = 'http://localhost:5135/api';

/**
 * Fetch data from the server.
 * @param {string} endpoint - The endpoint to fetch data from.
 * @param {RequestInit} [options={}] - The fetch options.
 * @returns {Promise<Response>} - The fetch response.
 */
async function fetchRest(endpoint, options = {}) {
  const url = typeof window !== 'undefined' ? `${ BASE_CLIENT_URL }${ endpoint }` : `${ BASE_SERVER_URL }${ endpoint }`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export default fetchRest;