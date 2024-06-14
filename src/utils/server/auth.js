import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.SECRET_KEY;
const ACCESS_TOKEN_COOKIE_NAME = process.env.ACCESS_TOKEN_COOKIE_NAME;
const REFRESH_TOKEN_COOKIE_NAME = process.env.REFRESH_TOKEN_COOKIE_NAME;


function getTokens() {
  const cookieStore = cookies();

  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  return { accessToken, refreshToken };
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    } else if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired');
    } else if (error instanceof jwt.NotBeforeError) {
      throw new Error('Token not active');
    } else {
      throw new Error('Token verification failed');
    }
  }
}

export function isAuth() {
  const { accessToken, refreshToken } = getTokens();

  if (!accessToken || !refreshToken) {
    return false;
  }

  try {
    verifyToken(accessToken);
    return true;
  } catch (e) {
    return false;
  }
}

export function getAuthUserId() {
  if (!isAuth()) {
    return null;
  }

  const { accessToken } = getTokens();

  try {
    const payload = verifyToken(accessToken);
    return payload.sub;
  } catch (e) {
    console.error('Failed to verify token:', e);
    return null;
  }
}

export async function fetchUserData() {
  const { accessToken, refreshToken } = getTokens();
  const userId = getAuthUserId();

  if (!userId)
    return {};

  const response = await fetch(`http://localhost:5135/api/v1/users/${ userId }`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ accessToken }`,
      'Cookie': `${ ACCESS_TOKEN_COOKIE_NAME }=${ accessToken }; ${ REFRESH_TOKEN_COOKIE_NAME }=${ refreshToken }}}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  return await response.json();
}

export async function serverFetch(url, options = {}) {
  const { accessToken, refreshToken } = getTokens();

  const { method = 'GET', headers = {}, body = null } = options;

  const fetchHeaders = {
    ...headers,
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ accessToken }`,
    'Cookie': `${ ACCESS_TOKEN_COOKIE_NAME }=${ accessToken }; ${ REFRESH_TOKEN_COOKIE_NAME }=${ refreshToken };`,
  };

  const response = await fetch(url, {
    method,
    headers: fetchHeaders,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    //throw new Error('Failed to fetch data');
    return null;
  }

  return await response.json();
}
